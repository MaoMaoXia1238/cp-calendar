import { router } from "./lib/trpc";
import { contestRouter } from "./routers/contest";

export const appRouter = router({
  contest: contestRouter,
});

export type AppRouter = typeof appRouter;
