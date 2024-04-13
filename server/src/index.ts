import { entries as entriesTbl, images } from "../drizzle/schema";
import { entries } from "./../drizzle/schema";
import * as schema from "./../drizzle/schema";
import * as schemaRelations from "./../drizzle/schemaRelations";
import { cors } from "@elysiajs/cors";
import { parse } from "csv-parse/sync";
import { asc, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import postgres from "postgres";

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle(queryClient, { schema: { ...schema, ...schemaRelations } });

const app = new Elysia()
  .use(cors({ methods: "*" }))
  .use(clerkPlugin())
  .get("/", async () => "hello world!")

  .post(
    "/entry",
    async ({ clerk, store, set, body }) => {
      if (!store.auth?.userId) return (set.status = "Unauthorized");
      const user = await clerk.users.getUser(store.auth.userId);
      const [inserted] = await db
        .insert(entriesTbl)
        .values({
          weight: "" + body.weight,
          userId: user.id,
          date: new Date(body.date),
        })
        .returning();

      if (body.images)
        await db
          .insert(images)
          .values(body.images.map((path) => ({ path, entryId: +inserted.id })));

      return { content: { success: true } };
    },
    {
      body: t.Object({
        date: t.Any(),
        weight: t.Number(),
        images: t.Optional(t.Array(t.String())),
      }),
    },
  )

  .put(
    "/entry/:id",
    async ({ clerk, store, set, body, params: { id } }) => {
      if (!store.auth?.userId) return (set.status = "Unauthorized");
      const user = await clerk.users.getUser(store.auth.userId);
      await db
        .update(entriesTbl)
        .set({
          weight: "" + body.weight,
          userId: user.id,
          date: new Date(body.date),
        })
        .where(eq(entriesTbl.id, +id));

      if (body.images) await db.delete(images).where(eq(images.entryId, +id));
      if (body.images)
        await db
          .insert(images)
          .values(body.images.map((path) => ({ path, entryId: +id })));

      return { content: { success: true } };
    },
    {
      body: t.Object({
        date: t.Any(),
        weight: t.Number(),
        images: t.Optional(t.Array(t.String())),
      }),
    },
  )

  .delete("/entry/:id", async ({ clerk, store, set, params: { id } }) => {
    if (!store.auth?.userId) return (set.status = "Unauthorized");
    const user = await clerk.users.getUser(store.auth.userId);
    await db.delete(entriesTbl).where(eq(entriesTbl.id, +id));
    return { content: { success: true } };
  })

  .get("/entries", async ({ clerk, store, set, body }) => {
    if (!store.auth?.userId) return (set.status = "Unauthorized");
    const user = await clerk.users.getUser(store.auth.userId);
    // const entries = await db
    //   .select()
    //   .from(entriesTbl)
    //   .where(eq(entriesTbl.userId, user.id))
    //   .orderBy(desc(entriesTbl.date));
    const entries = await db.query.entries.findMany({
      where: eq(entriesTbl.userId, user.id),
      orderBy: desc(entriesTbl.date),
      with: { images: true },
    });
    return { content: { success: true, entries } };
  })

  .post(
    "/import-csv",
    async ({ clerk, store, set, body: { file } }) => {
      if (!store.auth?.userId) return (set.status = "Unauthorized");
      const user = await clerk.users.getUser(store.auth.userId);

      const csvTextContent = await file[0].text();
      const parsedCsv = parse(csvTextContent, {
        columns: true,
        skip_empty_lines: true,
      });

      const currentEntries = await db
        .select()
        .from(entriesTbl)
        .where(eq(entriesTbl.userId, user.id));

      await db.insert(entriesTbl).values([
        ...parsedCsv
          .map((entry: { Weight: string; Date: string }) => ({
            weight: +entry.Weight,
            date: new Date(entry.Date),
            userId: user.id,
          }))
          .filter(
            (entry: any) =>
              !!entry.weight &&
              !currentEntries.some(
                (cEntry) =>
                  new Date(cEntry.date).toISOString() ===
                  new Date(entry.date).toISOString(),
              ),
          ),
      ]);
      return { content: { success: true } };
    },
    {
      type: "formdata",
      body: t.Object({
        file: t.Files(),
      }),
    },
  )

  .listen(process.env.PORT!);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
