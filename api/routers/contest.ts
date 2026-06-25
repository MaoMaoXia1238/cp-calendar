import { router, publicProcedure } from "../lib/trpc";
import { fetchAllContests } from "../scrapers";
import { getDb } from "../queries/connection";
import { contests } from "../../db/schema";
import { eq, and, gte } from "drizzle-orm";

export const contestRouter = router({
  list: publicProcedure.query(async () => {
    const db = getDb();
    const now = new Date();
    const result = await db
      .select()
      .from(contests)
      .where(gte(contests.startTime, now))
      .orderBy(contests.startTime);
    return result;
  }),

  refresh: publicProcedure.mutation(async () => {
    const fetched = await fetchAllContests();
    const db = getDb();

    for (const contest of fetched) {
      const existing = await db
        .select()
        .from(contests)
        .where(
          and(
            eq(contests.platform, contest.platform),
            eq(contests.contestId, contest.contestId)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        await db
          .update(contests)
          .set({
            name: contest.name,
            url: contest.url,
            startTime: contest.startTime,
            endTime: contest.endTime,
            duration: contest.duration,
          })
          .where(eq(contests.id, existing[0].id));
      } else {
        await db.insert(contests).values(contest);
      }
    }

    return { count: fetched.length };
  }),
});
