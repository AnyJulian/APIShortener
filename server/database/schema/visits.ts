import { integer, pgTable, text, timestamp, primaryKey, uuid } from "drizzle-orm/pg-core";
import { string } from "zod";

export const visits = pgTable('visits', {
  id: uuid().primaryKey(), // Utiliser un UUID comme clé primaire
  slug: text(),
  link_id: text(),
  created_at: timestamp().notNull(),
  ip: text().notNull(),
  user_agent: text().notNull(),
})

//test