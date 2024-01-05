import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { recipeSchema } from "@/schemas/recipeSchema";

export const recipeRouter = createTRPCRouter({
  getRecipes: publicProcedure.query(({ ctx }) => {
    return ctx.db.recipe.findMany();
  }),

  getById: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.recipe.findFirst({
      where: {
        id: input,
      },
    });
  }),

  addRecipe: protectedProcedure
    .input(recipeSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        title,
        imageUrl,
        cookingTime,
        difficultyLevel,
        details,
        categoryId,
        ingredients,
        tags,
      } = input;

      return ctx.db.recipe.create({
        data: {
          title,
          imageUrl,
          cookingTime,
          difficultyLevel,
          details,
          createdBy: { connect: { id: ctx.session.user.id } },
          category: {
            connect: { id: categoryId },
          },
          recipeIngredients: {
            create: ingredients.map((ingredient) => ({
              ingredient: {
                connectOrCreate: {
                  where: { title: ingredient.title },
                  create: { title: ingredient.title },
                },
              },
              quantity: ingredient.quantity,
            })),
          },
          recipeTags: {
            create: tags.map((tag) => ({
              tag: {
                connectOrCreate: {
                  where: { title: tag.title },
                  create: { title: tag.title },
                },
              },
            })),
          },
        },
      });
    }),
});
