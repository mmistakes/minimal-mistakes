import { GITHUB } from "@consts";

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  pushedAt: Date;
};

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

let cache: Promise<Repo[]> | undefined;

// Fetches public, non-fork repos at build time. Set GITHUB_TOKEN to avoid
// the unauthenticated rate limit. Returns [] if the API is unreachable so
// the build never fails because of GitHub.
export function getRepos(): Promise<Repo[]> {
  cache ??= fetchRepos();
  return cache;
}

async function fetchRepos(): Promise<Repo[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": `${GITHUB.USERNAME}-site`,
  };
  if (import.meta.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
  }

  let data: ApiRepo[];
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB.USERNAME}/repos?per_page=100&type=owner`,
      { headers },
    );
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    data = await res.json();
  } catch (err) {
    console.warn(`[github] could not fetch repos: ${err}`);
    return [];
  }

  const pinned = (name: string) => {
    const i = GITHUB.PINNED.indexOf(name);
    return i === -1 ? Infinity : i;
  };

  return data
    .filter((r) => !r.fork && !r.archived && !GITHUB.EXCLUDE.includes(r.name))
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      homepage: r.homepage || null,
      language: r.language,
      stars: r.stargazers_count,
      pushedAt: new Date(r.pushed_at),
    }))
    .sort(
      (a, b) =>
        pinned(a.name) - pinned(b.name) ||
        b.stars - a.stars ||
        b.pushedAt.valueOf() - a.pushedAt.valueOf(),
    );
}
