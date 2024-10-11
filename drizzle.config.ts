import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    schema: "./src/bikes/entities/bike.entity.ts",
    out: "./src/drizzle/migrations",
    dbCredentials: {
        url: "sqlite.db"
    }
});

