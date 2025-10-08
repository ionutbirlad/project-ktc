// app/api/github-stats/route.ts
import { NextResponse } from "next/server";

const GQL = `
  query RepoStats(
    $owner: String!
    $name: String!
    $since7d: GitTimestamp!
    $since30d: GitTimestamp!
    $sinceY: GitTimestamp!
  ) {
    repository(owner: $owner, name: $name) {
      name
      stargazers { totalCount }
      forks { totalCount }
      pullRequests(states: MERGED) { totalCount }
      issues(states: CLOSED) { totalCount }
      releases(first: 1, orderBy: {field: CREATED_AT, direction: DESC}) {
        nodes { tagName publishedAt }
      }
      defaultBranchRef {
        target {
          ... on Commit {
            history(since: $since7d)  { totalCount }
          }
        }
      }
      commits30d: defaultBranchRef {
        target {
          ... on Commit {
            history(since: $since30d) { totalCount }
          }
        }
      }
      commitsY: defaultBranchRef {
        target {
          ... on Commit {
            history(since: $sinceY) { totalCount }
          }
        }
      }
      languages(first: 6, orderBy: { field: SIZE, direction: DESC }) {
        totalSize
        edges { size node { name } }
      }
    }
  }
`;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const owner = url.searchParams.get("owner");
  const name = url.searchParams.get("name");
  if (!owner || !name) {
    return NextResponse.json({ error: "Missing ?owner= & ?name=" }, { status: 400 });
  }

  const now = new Date();
  const since7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const since30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const sinceY = new Date(new Date().getFullYear(), 0, 1).toISOString();

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: GQL,
      variables: { owner, name, since7d, since30d, sinceY },
    }),
    // cache lato server (riduce rate-limit). Cambia TTL se vuoi.
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const txt = await res.text();
    return NextResponse.json({ error: "GitHub API error", details: txt }, { status: 502 });
  }

  const { data } = await res.json();
  const repo = data?.repository;
  if (!repo) return NextResponse.json({ error: "Repository not found" }, { status: 404 });

  // Normalizzazione output
  const commits7d = repo.defaultBranchRef?.target?.history?.totalCount ?? 0;
  const commits30d = repo.commits30d?.target?.history?.totalCount ?? 0;
  const commitsY = repo.commitsY?.target?.history?.totalCount ?? 0;

  const latest = repo.releases?.nodes?.[0] ?? null;

  type LanguageEdge = {
    size: number;
    node: { name: string };
  };

  const totalLang = repo.languages?.totalSize ?? 0;
  const edges: LanguageEdge[] = repo.languages?.edges ?? [];

  const languages = edges
    .map((e) => ({
      name: e.node.name,
      pct: totalLang ? Math.round((e.size / totalLang) * 100) : 0,
    }))
    .slice(0, 5);

  return NextResponse.json({
    repo: repo.name,
    stars: repo.stargazers.totalCount,
    forks: repo.forks.totalCount,
    prsMerged: repo.pullRequests.totalCount,
    issuesClosed: repo.issues.totalCount,
    commits7d,
    commits30d,
    commitsThisYear: commitsY,
    latestRelease: latest ? { tag: latest.tagName, publishedAt: latest.publishedAt } : null,
    languages,
    fetchedAt: new Date().toISOString(),
  });
}
