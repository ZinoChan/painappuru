import { createTRPCRouter, publicProcedure } from "../trpc";

export const measurmentUnitRouter = createTRPCRouter({
  getMeasurmentUnits: publicProcedure.query(({ ctx }) => {
    return ctx.db.measurmentUnit.findMany();
  }),
});
