import type { App } from "../../../server/src/index";
import { treaty } from "@elysiajs/eden";

const app = treaty<App>("" + process.env.NEXT_PUBLIC_API_BASE);
export default app;
