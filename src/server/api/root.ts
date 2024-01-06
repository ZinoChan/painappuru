import { createTRPCRouter } from "@/server/api/trpc";
import { recipeRouter } from "./routers/recipe";
import { ingredientRouter } from "./routers/ingredient";
import { categoryRouter } from "./routers/category";
import { measurmentUnitRouter } from "./routers/measurmentUnit";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  recipe: recipeRouter,
  ingredient: ingredientRouter,
  category: categoryRouter,
  measurmentUnit: measurmentUnitRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
