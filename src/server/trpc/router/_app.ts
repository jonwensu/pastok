import { router } from "../trpc";
import { questionRouter } from "./question";

export const appRouter = router({
  quesiton: questionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
