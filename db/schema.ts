import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const visualSettings = sqliteTable('visual_settings', {
  id: text('id').primaryKey(),
  draft: text('draft').notNull(),
  published: text('published').notNull(),
  revision: integer('revision').notNull().default(0),
  updatedAt: text('updated_at').notNull(),
});
