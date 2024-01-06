import { createTRPCRouter, publicProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  getCategories: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.findMany();
  }),
});
