import { entries as entriesTbl, users as usersTbl } from "../drizzle/schema";
import { cors } from "@elysiajs/cors";
import { asc, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import postgres from "postgres";

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle(queryClient);

const app = new Elysia()
  //@ts-ignore
  .use(cors({ methods: "*" }))

  .use(clerkPlugin())
  .get("/", async () => "hello world!")

  .post(
    "/entry",
    async ({ clerk, store, set, body }) => {
      if (!store.auth?.userId) return (set.status = "Unauthorized");
      const user = await clerk.users.getUser(store.auth.userId);
      await db.insert(entriesTbl).values({
        weight: "" + body.weight,
        userId: user.id,
        date: new Date(body.date),
      });
      return { content: { success: true } };
    },
    {
      body: t.Object({
        date: t.Any(),
        weight: t.Number(),
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
      return { content: { success: true } };
    },
    {
      body: t.Object({
        date: t.Any(),
        weight: t.Number(),
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
    const entries = await db
      .select()
      .from(entriesTbl)
      .where(eq(entriesTbl.userId, user.id))
      .orderBy(desc(entriesTbl.date));

    return { content: { success: true, entries } };
  })

  .listen(process.env.PORT!);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
