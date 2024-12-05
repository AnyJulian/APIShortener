import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { links } from "./links";
import { tags } from "./tags";

export const link_tags = pgTable('link_tags', {
    link_slug: text().references(() => links.slug).notNull(),
    tag_id: integer().references(() => tags.id),
}, (columns) => ({
    pk: primaryKey({ columns: [columns.link_slug, columns.tag_id] }),
}));