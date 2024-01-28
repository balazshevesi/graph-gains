import { Elysia } from "elysia";
import clerkClient from "@clerk/clerk-sdk-node";
const userList = await clerkClient.users.getUserList();

const app = new Elysia()
  .get("/", () => ({ hello: "Hello Elysia" }))
  .get("/users", () => ({ userList }))
  .listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
