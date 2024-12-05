import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const visits = pgTable('visits', {
  id: integer().primaryKey(),
  link_id: text().notNull(),
  created_at: timestamp().notNull(),
  ip: text().notNull(),
  user_agent: text().notNull(),
})