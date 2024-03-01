import { entries, users } from "../drizzle/schema";
import { cors } from "@elysiajs/cors";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import postgres from "postgres";

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle(queryClient);

const app = new Elysia()
  .use(cors())
  .use(clerkPlugin())
  .get("/", async () => "hello world!")
  // .get("/test", async () => {
  //   await db.insert(entries).values({
  //     weight: "10",
  //     userId: "123",
  //     date: "" + new Date(),
  //   });
  //   return "hello world!";
  // })

  .post(
    "/entry",
    async ({ clerk, store, set, body }) => {
      if (!store.auth?.userId) return (set.status = "Unauthorized");
      const user = await clerk.users.getUser(store.auth.userId);
      await db.insert(entries).values({
        weight: "" + body.weight,
        userId: user.id,
        date: "" + body.date,
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

  .listen(process.env.PORT!);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
