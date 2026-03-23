CREATE TABLE "asset" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"location_id" uuid NOT NULL,
	"map_id" uuid NOT NULL,
	"x" double precision NOT NULL,
	"y" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "location" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "map" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL,
	"location_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "asset" ADD CONSTRAINT "asset_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "asset" ADD CONSTRAINT "asset_map_id_map_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."map"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "map" ADD CONSTRAINT "map_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE no action ON UPDATE no action;