import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

const GQL = `
  query RepoStats($owner: String!, $name: String!, $sinceY: GitTimestamp!) {
    repository(owner: $owner, name: $name) {
      name
      stargazers { totalCount }
      forks { totalCount }
      pullRequests(states: MERGED) { totalCount }
      issues(states: CLOSED) { totalCount }
      releases(first: 1, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes { tagName publishedAt }
      }
      defaultBranchRef { target { ... on Commit { history { totalCount } } } }
      commitsY: defaultBranchRef { target { ... on Commit { history(since: $sinceY) { totalCount } } } }
    }
    user(login: $owner) {
      contributionsCollection {
        contributionCalendar {
          weeks { contributionDays { date contributionCount } }
        }
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

  const sinceY = new Date(new Date().getFullYear(), 0, 1).toISOString();

  // 1) Stats da GitHub (niente languages)
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query: GQL, variables: { owner, name, sinceY } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const txt = await res.text();
    return NextResponse.json({ error: "GitHub API error", details: txt }, { status: 502 });
  }

  const { data } = await res.json();
  const repo = data?.repository;
  const user = data?.user;
  if (!repo) return NextResponse.json({ error: "Repository not found" }, { status: 404 });

  // 2) Leggi package.json in tempo reale
  const pkgPath = path.join(process.cwd(), "package.json");
  const pkgRaw = await fs.readFile(pkgPath, "utf8");
  const pkg = JSON.parse(pkgRaw) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };

  const deps = Object.keys(pkg.dependencies ?? {}).sort((a, b) => a.localeCompare(b));
  const devDeps = Object.keys(pkg.devDependencies ?? {}).sort((a, b) => a.localeCompare(b));

  // 3) chartDataTechnologies per treemap (nessuna mappatura, nomi così come sono)
  const chartDataTechnologies = {
    name: "Technologies",
    children: [
      {
        name: "Dependencies",
        children: deps.map((d) => ({ name: d, value: 1 })),
      },
      {
        name: "DevDependencies",
        children: devDeps.map((d) => ({ name: d, value: 1 })),
      },
    ],
  };

  // 4) Stats (invariati)
  const totalCommits = repo.defaultBranchRef?.target?.history?.totalCount ?? 0;
  const commitsY = repo.commitsY?.target?.history?.totalCount ?? 0;
  const latest = repo.releases?.nodes?.[0] ?? null;

  const weeks: { contributionDays: { date: string; contributionCount: number }[] }[] =
    user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
  const days = weeks.flatMap((w) => w.contributionDays) ?? [];
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].contributionCount > 0) streak++;
    else break;
  }

  const stats = [
    { label: "⭐ Stars", value: repo.stargazers.totalCount },
    { label: "🍴 Forks", value: repo.forks.totalCount },
    { label: "🔄 PR Mergeate", value: repo.pullRequests.totalCount },
    { label: "🐛 Issue Chiuse", value: repo.issues.totalCount },
    { label: "💻 Commit Totali", value: totalCommits },
    { label: "📆 Commit quest’anno", value: commitsY },
    latest && {
      label: "🚀 Ultima release",
      value: `${latest.tagName} – ${new Date(latest.publishedAt).toLocaleDateString("it-IT")}`,
    },
    { label: "🔥 Streak", value: `${streak} giorni` },
  ].filter(Boolean);

  return NextResponse.json({
    repo: repo.name,
    fetchedAt: new Date().toISOString(),
    stats,
    chartDataTechnologies,
  });
}
