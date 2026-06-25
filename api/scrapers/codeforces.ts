import { ScrapedContest } from "./types";

interface CFContest {
  id: number;
  name: string;
  startTimeSeconds: number;
  durationSeconds: number;
  phase: string;
}

export async function fetchCodeforcesContests(): Promise<ScrapedContest[]> {
  try {
    const res = await fetch("https://codeforces.com/api/contest.list?gym=false", {
      headers: { "User-Agent": "CP-Calendar/1.0" },
    });
    const data = await res.json();
    if (data.status !== "OK") return [];

    return data.result
      .filter((c: CFContest) => c.phase === "BEFORE")
      .map((c: CFContest): ScrapedContest => ({
        platform: "codeforces",
        contestId: String(c.id),
        name: c.name,
        url: `https://codeforces.com/contests/${c.id}`,
        startTime: new Date(c.startTimeSeconds * 1000),
        endTime: new Date((c.startTimeSeconds + c.durationSeconds) * 1000),
        duration: c.durationSeconds,
      }));
  } catch (err) {
    console.error("Codeforces scraper error:", err);
    return [];
  }
}
