import { ScrapedContest } from "./types";
import { fetchCodeforcesContests } from "./codeforces";
import { fetchAtCoderContests } from "./atcoder";
import { fetchLeetCodeContests } from "./leetcode";
import { fetchLuoguContests } from "./luogu";
import { fetchNowCoderContests } from "./nowcoder";

export async function fetchAllContests(): Promise<ScrapedContest[]> {
  const results = await Promise.allSettled([
    fetchCodeforcesContests(),
    fetchAtCoderContests(),
    fetchLeetCodeContests(),
    fetchLuoguContests(),
    fetchNowCoderContests(),
  ]);

  const allContests: ScrapedContest[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      allContests.push(...result.value);
    } else {
      console.error("Scraper failed:", result.reason);
    }
  }

  return allContests;
}

export * from "./types";
