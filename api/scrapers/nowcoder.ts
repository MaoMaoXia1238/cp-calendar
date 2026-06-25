import * as cheerio from "cheerio";
import { ScrapedContest } from "./types";

export async function fetchNowCoderContests(): Promise<ScrapedContest[]> {
  try {
    const res = await fetch("https://ac.nowcoder.com/acm/contest/vip-index", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    const contests: ScrapedContest[] = [];

    $(".platform-item.js-item").each((_, el) => {
      const nameEl = $(el).find(".platform-item__name a");
      const name = nameEl.text().trim();
      const href = nameEl.attr("href") || "";
      const timeEl = $(el).find(".platform-item__time");
      const timeText = timeEl.text().trim();
      if (!name || !timeText) return;

      const timeMatch = timeText.match(/(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})/);
      if (!timeMatch) return;

      const startTime = new Date(timeMatch[1] + "+08:00");
      const durationMatch = timeText.match(/时长\s*(\d+)\s*小时/);
      const durationHours = durationMatch ? parseInt(durationMatch[1]) : 3;
      const durationSeconds = durationHours * 3600;

      contests.push({
        platform: "nowcoder",
        contestId: href.split("?").pop() || name,
        name,
        url: href.startsWith("http") ? href : `https://ac.nowcoder.com${href}`,
        startTime,
        endTime: new Date(startTime.getTime() + durationSeconds * 1000),
        duration: durationSeconds,
      });
    });

    return contests;
  } catch (err) {
    console.error("NowCoder scraper error:", err);
    return [];
  }
}
