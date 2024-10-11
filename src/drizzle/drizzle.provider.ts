import * as Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '../bikes/entities/bike.entity';

export const DrizzleAsyncProvider = 'drizzleProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    useFactory: async () => {
      const sqlite = new Database('sqlite.db'); // Create SQLite instance
      const db = drizzle(sqlite, { schema }); // Initialize ORM with schema
      return db; // Return database instance
    },
    export: [DrizzleAsyncProvider],
  },
];
