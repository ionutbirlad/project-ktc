import { NextResponse } from "next/server";

// 🔹 Query GraphQL estesa (repo + user)
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
      defaultBranchRef {
        target {
          ... on Commit {
            history { totalCount }
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

    user(login: $owner) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
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

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: GQL,
      variables: { owner, name, sinceY },
    }),
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

  // 🔹 Estrazione e normalizzazione
  const totalCommits = repo.defaultBranchRef?.target?.history?.totalCount ?? 0;
  const commitsY = repo.commitsY?.target?.history?.totalCount ?? 0;
  const latest = repo.releases?.nodes?.[0] ?? null;

  type LanguageEdge = {
    size: number;
    node: {
      name: string;
    };
  };

  const totalLang = repo.languages?.totalSize ?? 0;
  const langEdges: LanguageEdge[] = repo.languages?.edges ?? [];
  const languages = langEdges
    .map((e) => ({
      name: e.node.name,
      pct: totalLang ? Math.round((e.size / totalLang) * 100) : 0,
    }))
    .slice(0, 5);

  // 🔹 Calcolo streak (giorni consecutivi con almeno 1 contributo)
  type Week = {
    contributionDays: {
      date: Date;
      contributionCount: number;
    };
  };

  const weeks: Week[] = user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  const days = weeks.flatMap((w) => w.contributionDays) ?? [];

  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].contributionCount > 0) streak++;
    else break;
  }

  // 🔹 Normalizzazione finale in array di stats
  const stats = [
    {
      label: "⭐ Stars",
      value: repo.stargazers.totalCount,
      description: "Numero di utenti che hanno aggiunto una stella al repository su GitHub.",
    },
    {
      label: "🍴 Forks",
      value: repo.forks.totalCount,
      description: "Sviluppatori che hanno clonato il progetto per modificarlo o contribuire.",
    },
    {
      label: "🔄 PR Mergeate",
      value: repo.pullRequests.totalCount,
      description: "Pull request completate con successo nel branch principale.",
    },
    {
      label: "🐛 Issue Chiuse",
      value: repo.issues.totalCount,
      description: "Segnalazioni o bug risolti all’interno del repository.",
    },
    {
      label: "💻 Commit Totali",
      value: totalCommits,
      description: "Numero complessivo di commit effettuati sul branch principale.",
    },
    {
      label: "📆 Commit quest’anno",
      value: commitsY,
      description: "Totale dei commit realizzati dall’inizio dell’anno.",
    },
    {
      label: "🔥 Streak",
      value: `${streak} giorni`,
      description: "Giorni consecutivi in cui ci sono stati contributi al codice.",
    },
    {
      label: "🧠 Linguaggi principali",
      value: languages.map((l) => `${l.name} (${l.pct}%)`).join(", "),
      description: "Distribuzione percentuale dei linguaggi usati nel repository.",
    },
    latest && {
      label: "🚀 Ultima release",
      value: `${latest.tagName} – ${new Date(latest.publishedAt).toLocaleDateString("it-IT")}`,
      description: "Versione più recente del progetto pubblicata su GitHub.",
    },
  ].filter(Boolean);

  return NextResponse.json({
    repo: repo.name,
    fetchedAt: new Date().toISOString(),
    stats,
  });
}
