CREATE TABLE IF NOT EXISTS "link_tags" (
	"link_slug" text NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "link_tags_link_slug_tag_id_pk" PRIMARY KEY("link_slug","tag_id")
);
--> statement-breakpoint
ALTER TABLE "links" ADD COLUMN "tag_id" integer;--> statement-breakpoint
ALTER TABLE "tags" ADD COLUMN "id" integer PRIMARY KEY NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "link_tags" ADD CONSTRAINT "link_tags_link_slug_links_slug_fk" FOREIGN KEY ("link_slug") REFERENCES "public"."links"("slug") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "link_tags" ADD CONSTRAINT "link_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "tags" DROP COLUMN IF EXISTS "id_tag";