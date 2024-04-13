import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  numeric,
  varchar,
  timestamp,
  foreignKey,
  text,
  integer,
} from "drizzle-orm/pg-core";

export const entries = pgTable("entries", {
  id: serial("id").primaryKey().notNull(),
  weight: numeric("weight", { precision: 5, scale: 2 }),
  userId: varchar("user_id", { length: 200 }).notNull(),
  date: timestamp("date", { mode: "date" }).notNull(),
});

export const images = pgTable("images", {
  id: serial("id").notNull(),
  path: text("path").notNull(),
  entryId: integer("entry_id")
    .notNull()
    .references(() => entries.id, { onDelete: "cascade", onUpdate: "cascade" }),
});
