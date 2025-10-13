import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

// 🔹 Query GraphQL per statistiche repo
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
        target { ... on Commit { history { totalCount } } }
      }
      commitsY: defaultBranchRef {
        target { ... on Commit { history(since: $sinceY) { totalCount } } }
      }
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

// 🔹 Funzione di scoring euristico (senza mapping statico)
function scoreTech(pkgName: string, isDev: boolean): number {
  // base score
  let score = isDev ? 1 : 3;

  // Core framework / runtime
  if (/(^|\/)(next|react|typescript|node|vite|webpack)($|[-/])/i.test(pkgName)) score += 7;

  // Stack principali (UI, styling, backend)
  if (/(tailwind|supabase|prisma|redux|zustand|router|next-mdx|mdx)/i.test(pkgName)) score += 5;

  // Librerie di UI/animazioni/data-viz
  if (/(radix|lucide|framer|embla|marquee|nivo|d3|spline)/i.test(pkgName)) score += 4;

  // Tooling e qualità
  if (/(eslint|prettier|postcss|lint|husky|commitlint)/i.test(pkgName)) score += isDev ? 1 : 2;

  // Tipizzazioni
  if (/^@types\//i.test(pkgName)) score = Math.max(score, 1);

  // Smussamento finale
  return Math.max(1, Math.round(score));
}

// 🔹 Handler principale API
export async function GET(req: Request) {
  const url = new URL(req.url);
  const owner = url.searchParams.get("owner");
  const name = url.searchParams.get("name");
  const weighted = url.searchParams.get("weighted") === "1"; // opzionale

  if (!owner || !name) {
    return NextResponse.json({ error: "Missing ?owner= & ?name=" }, { status: 400 });
  }

  const sinceY = new Date(new Date().getFullYear(), 0, 1).toISOString();

  // 1️⃣ Fetch GitHub stats
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

  // 2️⃣ Legge package.json in tempo reale
  const pkgPath = path.join(process.cwd(), "package.json");
  const pkgRaw = await fs.readFile(pkgPath, "utf8");
  const pkg = JSON.parse(pkgRaw) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };

  const deps = Object.keys(pkg.dependencies ?? {}).sort((a, b) => a.localeCompare(b));
  const devDeps = Object.keys(pkg.devDependencies ?? {}).sort((a, b) => a.localeCompare(b));

  // 3️⃣ Crea chartDataTechnologies con pesi euristici
  const depLeaves = deps.map((d) => ({
    name: d,
    value: weighted ? scoreTech(d, false) : 1,
  }));

  const devDepLeaves = devDeps.map((d) => ({
    name: d,
    value: weighted ? scoreTech(d, true) : 1,
  }));

  const chartDataTechnologies = {
    name: "Technologies",
    children: [
      { name: "Dependencies", children: depLeaves },
      { name: "DevDependencies", children: devDepLeaves },
    ],
  };

  // 4️⃣ Calcolo statistiche GitHub
  const totalCommits = repo.defaultBranchRef?.target?.history?.totalCount ?? 0;
  const commitsY = repo.commitsY?.target?.history?.totalCount ?? 0;
  const latest = repo.releases?.nodes?.[0] ?? null;

  // ✅ Calcolo streak robusto: ignora giorni FUTURI e ignora gli 0 di "oggi" in coda
  const weeks: { contributionDays: { date: string; contributionCount: number }[] }[] =
    user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
  const days = weeks.flatMap((w) => w.contributionDays) ?? [];

  // Oggi nel fuso Europe/Rome formattato YYYY-MM-DD (compatibile con date GitHub)
  const todayRome = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Rome" }).format(
    new Date()
  );

  // Tieni solo i giorni <= oggi e ordina cronologicamente
  const pastOrToday = days
    .filter((d) => d.date <= todayRome)
    .sort((a, b) => a.date.localeCompare(b.date));

  // Salta eventuali zeri finali (es. oggi ancora a 0)
  let i = pastOrToday.length - 1;
  while (i >= 0 && pastOrToday[i].contributionCount === 0) i--;

  // Conta la streak da lì indietro finché > 0
  let streak = 0;
  for (; i >= 0 && pastOrToday[i].contributionCount > 0; i--) streak++;

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

  // 5️⃣ Risposta finale
  return NextResponse.json({
    repo: repo.name,
    fetchedAt: new Date().toISOString(),
    stats,
    chartDataTechnologies,
  });
}
