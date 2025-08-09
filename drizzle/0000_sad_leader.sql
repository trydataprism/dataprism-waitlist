CREATE TABLE "waitlist_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "waitlist_entries_email_unique" UNIQUE("email")
);
