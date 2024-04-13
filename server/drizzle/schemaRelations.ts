//! do not delete this file pls. it's not auto generated with the introspect command
import { entries, images } from "./schema";
import { relations } from "drizzle-orm";

export const imagesRelation = relations(images, ({ one, many }) => ({
  entries: one(entries, {
    fields: [images.entryId],
    references: [entries.id],
  }),
}));

export const entriesRelation = relations(entries, ({ one, many }) => ({
  images: many(images),
}));
