import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Define the 'bike' table schema using Drizzle ORM

export const bike = sqliteTable('bike', {
  id: text('id').primaryKey(), // 'id' column as a text type and primary key
  make: text('make'),
  model: text('model'),
  year: integer('year'),
  type: text('type'),
});
