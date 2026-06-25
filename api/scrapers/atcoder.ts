import * as cheerio from "cheerio";
import { ScrapedContest } from "./types";

export async function fetchAtCoderContests(): Promise<ScrapedContest[]> {
  try {
    const response = await fetch("https://atcoder.jp/contests/", {
      headers: { "User-Agent": "CP-Calendar/1.0" },
    });
    const html = await response.text();
    const $ = cheerio.load(html);

    const contests: ScrapedContest[] = [];

    $("#contest-table-upcoming tbody tr").each((_, row) => {
      const cols = $(row).find("td");
      if (cols.length < 4) return;

      const startTimeStr = $(cols[0]).text().trim();
      const nameLink = $(cols[1]).find("a");
      const name = nameLink.text().trim();
      const href = nameLink.attr("href") || "";
      const durationStr = $(cols[2]).text().trim();

      if (!name || !startTimeStr) return;

      const startTime = new Date(startTimeStr);
      const [hours, minutes] = durationStr.split(":").map(Number);
      const durationSeconds = (hours * 60 + minutes) * 60;

      contests.push({
        platform: "atcoder",
        contestId: href.split("/").pop() || name,
        name,
        url: `https://atcoder.jp${href}`,
        startTime,
        endTime: new Date(startTime.getTime() + durationSeconds * 1000),
        duration: durationSeconds,
      });
    });

    return contests;
  } catch (error) {
    console.error("AtCoder scraper error:", error);
    return [];
  }
}
