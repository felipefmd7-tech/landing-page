CREATE TABLE `visual_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`draft` text NOT NULL,
	`published` text NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL,
	`updated_at` text NOT NULL
);
