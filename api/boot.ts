import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { trpcServer } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";

const app = new Hono();

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext,
  })
);

app.get("/", (c) => c.text("CP Calendar API"));

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("Server running on http://localhost:3000");
