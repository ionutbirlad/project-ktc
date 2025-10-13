import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { guard } from "@/lib/api/guard";
import { GithubStatsQuerySchema } from "@/lib/validation/github-stats/stats";

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
  let score = isDev ? 1 : 3;
  if (/(^|\/)(next|react|typescript|node|vite|webpack)($|[-/])/i.test(pkgName)) score += 7;
  if (/(tailwind|supabase|prisma|redux|zustand|router|next-mdx|mdx)/i.test(pkgName)) score += 5;
  if (/(radix|lucide|framer|embla|marquee|nivo|d3|spline)/i.test(pkgName)) score += 4;
  if (/(eslint|prettier|postcss|lint|husky|commitlint)/i.test(pkgName)) score += isDev ? 1 : 2;
  if (/^@types\//i.test(pkgName)) score = Math.max(score, 1);
  return Math.max(1, Math.round(score));
}

// ✅ CORS whitelist (browser). Le richieste senza Origin (server-to-server) passano comunque.
const CORS = {
  origins: ["https://killthecompetition.vercel.app", "http://localhost:3000"],
  methods: ["GET", "OPTIONS"] as const,
  maxAge: 600,
};

export async function OPTIONS(req: Request) {
  const g = await guard(req, { methods: ["GET", "OPTIONS"], cors: CORS });
  return g.stop ? g.res : new Response(null, { status: 204 });
}

export async function GET(req: Request) {
  // 0) Guard: metodo, CORS (se Origin presente), rate limit
  const g = await guard(req, {
    methods: ["GET", "OPTIONS"],
    cors: CORS,
    rateLimit: { windowSec: 60, max: 60 },
  });
  if (g.stop) return g.res;

  // 1) Validazione query
  const url = new URL(req.url);
  const parsed = GithubStatsQuerySchema.safeParse({
    owner: url.searchParams.get("owner") ?? "",
    name: url.searchParams.get("name") ?? "",
    weighted: url.searchParams.get("weighted") ?? undefined,
  });
  if (!parsed.success) {
    const { formErrors, fieldErrors } = parsed.error.flatten();
    return g.withCors(
      NextResponse.json(
        { error: formErrors[0] ?? "Parametri invalidi", fieldErrors },
        { status: 400 }
      )
    );
  }
  const { owner, name, weighted } = parsed.data;

  const sinceY = new Date(new Date().getFullYear(), 0, 1).toISOString();

  // 2️⃣ Fetch GitHub stats
  if (!process.env.GITHUB_TOKEN) {
    return g.withCors(NextResponse.json({ error: "Missing GITHUB_TOKEN" }, { status: 500 }));
  }

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
    return g.withCors(
      NextResponse.json({ error: "GitHub API error", details: txt }, { status: 502 })
    );
  }

  const { data } = await res.json();
  const repo = data?.repository;
  const user = data?.user;
  if (!repo) {
    return g.withCors(NextResponse.json({ error: "Repository not found" }, { status: 404 }));
  }

  // 3️⃣ Legge package.json in tempo reale
  const pkgPath = path.join(process.cwd(), "package.json");
  const pkgRaw = await fs.readFile(pkgPath, "utf8");
  const pkg = JSON.parse(pkgRaw) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };

  const deps = Object.keys(pkg.dependencies ?? {}).sort((a, b) => a.localeCompare(b));
  const devDeps = Object.keys(pkg.devDependencies ?? {}).sort((a, b) => a.localeCompare(b));

  // 4️⃣ Chart data
  const depLeaves = deps.map((d) => ({ name: d, value: weighted ? scoreTech(d, false) : 1 }));
  const devDepLeaves = devDeps.map((d) => ({ name: d, value: weighted ? scoreTech(d, true) : 1 }));
  const chartDataTechnologies = {
    name: "Technologies",
    children: [
      { name: "Dependencies", children: depLeaves },
      { name: "DevDependencies", children: devDepLeaves },
    ],
  };

  // 5️⃣ Statistiche GitHub (streak robusta)
  const totalCommits = repo.defaultBranchRef?.target?.history?.totalCount ?? 0;
  const commitsY = repo.commitsY?.target?.history?.totalCount ?? 0;
  const latest = repo.releases?.nodes?.[0] ?? null;

  const weeks: { contributionDays: { date: string; contributionCount: number }[] }[] =
    user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
  const days = weeks.flatMap((w) => w.contributionDays) ?? [];

  const todayRome = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Rome" }).format(
    new Date()
  );
  const pastOrToday = days
    .filter((d) => d.date <= todayRome)
    .sort((a, b) => a.date.localeCompare(b.date));

  let i = pastOrToday.length - 1;
  while (i >= 0 && pastOrToday[i].contributionCount === 0) i--;
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
  ].filter((x): x is Exclude<typeof x, false | null | undefined> => Boolean(x));

  // 6️⃣ Risposta finale
  return g.withCors(
    NextResponse.json({
      repo: repo.name,
      fetchedAt: new Date().toISOString(),
      stats,
      chartDataTechnologies,
    })
  );
}
