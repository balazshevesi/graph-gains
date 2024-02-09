import { Elysia } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .use(clerkPlugin())
  .get("/", async () => {
    return { hello: "world" };
  })
  .get("/private", async ({ clerk, store, set }) => {
    console.log("private called");
    console.log(store);
    if (!store.auth?.userId) {
      set.status = 403;
      console.log("Unauthorized");
      return "Unauthorized";
    }
    const user = await clerk.users.getUser(store.auth.userId);
    return { user };
  })
  .post("/entry", async ({ clerk, store, set }) => {
    console.log("private called");
    console.log(store);
    if (!store.auth?.userId) {
      set.status = 403;
      console.log("Unauthorized");
      return "Unauthorized";
    }
    const user = await clerk.users.getUser(store.auth.userId);
    return { user };
  })
  .listen(process.env.PORT!);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
