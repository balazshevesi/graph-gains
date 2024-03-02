//* run "bunx drizzle-kit introspect:pg" to pull the db schema.
//* Note that the "timestamp" type should be set to "mode: "date"" and not "mode: "string"
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
