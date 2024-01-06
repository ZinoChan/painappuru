import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { ingredientSchema } from "@/schemas/ingredientSchema";

export const ingredientRouter = createTRPCRouter({
  getAllIngredients: publicProcedure.query(({ ctx }) => {
    return ctx.db.ingredient.findMany();
  }),

  addIngredient: protectedProcedure
    .input(ingredientSchema)
    .mutation(async ({ ctx, input }) => {
      const createIngredientPromises = input.ingredients.map(
        async (ingredient) => {
          await ctx.db.recipeIngredient.create({
            data: {
              ingredientFor: { connect: { id: ingredient.recipeId } },
              ingredient: {
                connectOrCreate: {
                  where: { title: ingredient.ingredientTitle },
                  create: { title: ingredient.ingredientTitle },
                },
              },
              measurmentQty: ingredient.measurmentQty,
              measurmentUnit: {
                connectOrCreate: {
                  where: { title: ingredient.measurmentUnitTitle },
                  create: { title: ingredient.measurmentUnitTitle },
                },
              },
            },
          });
        },
      );

      await Promise.all(createIngredientPromises);
    }),
});
