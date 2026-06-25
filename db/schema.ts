import {
  mysqlTable,
  serial,
  varchar,
  bigint,
  timestamp,
  text,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const contests = mysqlTable(
  "contests",
  {
    id: serial("id").primaryKey(),
    platform: varchar("platform", { length: 20 }).notNull(),
    contestId: varchar("contest_id", { length: 100 }).notNull(),
    name: varchar("name", { length: 500 }).notNull(),
    url: text("url").notNull(),
    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("end_time").notNull(),
    duration: bigint("duration", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
  },
  (table) => [
    uniqueIndex("platform_contest_idx").on(table.platform, table.contestId),
  ]
);
