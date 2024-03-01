import { pgTable, varchar, serial, numeric, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: varchar("id", { length: 200 }).primaryKey().notNull(),
});

export const entries = pgTable("entries", {
	id: serial("id").notNull(),
	weight: numeric("weight", { precision: 5, scale:  2 }),
	userId: varchar("user_id", { length: 200 }).notNull(),
	date: timestamp("date", { mode: 'string' }).notNull(),
});