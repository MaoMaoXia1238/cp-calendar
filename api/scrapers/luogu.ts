import { ScrapedContest } from "./types";

export async function fetchLuoguContests(): Promise<ScrapedContest[]> {
  try {
    const response = await fetch("https://www.luogu.com.cn/contest/list", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    const html = await response.text();

    const match = html.match(/JSON\.parse\(decodeURIComponent\("([^"]+)"\)\)/);
    if (!match) return [];

    const decoded = decodeURIComponent(match[1]);
    const data = JSON.parse(decoded);
    const contestList = data?.currentData?.contests?.result || [];

    return contestList.map(
      (c: any): ScrapedContest => ({
        platform: "luogu",
        contestId: String(c.id),
        name: c.name,
        url: `https://www.luogu.com.cn/contest/${c.id}`,
        startTime: new Date(c.startTime * 1000),
        endTime: new Date(c.endTime * 1000),
        duration: c.endTime - c.startTime,
      })
    );
  } catch (error) {
    console.error("Luogu scraper error:", error);
    return [];
  }
}
