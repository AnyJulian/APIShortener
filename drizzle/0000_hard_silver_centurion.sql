CREATE TABLE IF NOT EXISTS "links" (
	"slug" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"title" text NOT NULL,
	"max_visits" integer,
	"available_at" timestamp NOT NULL,
	"expired_at" timestamp,
	"created_at" timestamp NOT NULL,
	"update_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "visits" (
	"id" uuid PRIMARY KEY NOT NULL,
	"slug" text,
	"link_id" text,
	"created_at" timestamp NOT NULL,
	"ip" text NOT NULL,
	"user_agent" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "link_tags" (
	"link_slug" text NOT NULL,
	"tag_id" integer,
	CONSTRAINT "link_tags_link_slug_tag_id_pk" PRIMARY KEY("link_slug","tag_id")
);
--> statement-breakpoint
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
