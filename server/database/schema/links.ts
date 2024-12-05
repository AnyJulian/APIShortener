import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { tags } from "./tags";


export const links = pgTable('links', {
  slug: text().primaryKey(),
  url: text().notNull(),
  title: text().notNull(),
  max_visits: integer(),
  available_at: timestamp().notNull(),
  expired_at: timestamp(),
  created_at: timestamp().notNull(),
  update_at: timestamp().notNull(),
});
