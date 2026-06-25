import { ScrapedContest } from "./types";

const LEETCODE_GRAPHQL = `
  query topTwoContests {
    topTwoContests {
      title
      titleSlug
      startTime
      duration
    }
  }
`;

export async function fetchLeetCodeContests(): Promise<ScrapedContest[]> {
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com/contest/",
        "User-Agent": "CP-Calendar/1.0",
      },
      body: JSON.stringify({ query: LEETCODE_GRAPHQL }),
    });
    const data = await response.json();

    if (!data.data?.topTwoContests) return [];

    return data.data.topTwoContests.map(
      (c: any): ScrapedContest => ({
        platform: "leetcode",
        contestId: c.titleSlug,
        name: c.title,
        url: `https://leetcode.com/contest/${c.titleSlug}`,
        startTime: new Date(c.startTime * 1000),
        endTime: new Date((c.startTime + c.duration) * 1000),
        duration: c.duration,
      })
    );
  } catch (error) {
    console.error("LeetCode scraper error:", error);
    return [];
  }
}
