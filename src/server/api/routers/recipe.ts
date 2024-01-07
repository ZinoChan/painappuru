import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { recipeSchema, updateRecipeSchema } from "@/schemas/recipeSchema";

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

  getRecipeDetails: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) => {
      return ctx.db.recipe.findUnique({
        where: { id: input },
        include: {
          createdBy: true,
          category: true,
          recipeIngredients: {
            include: {
              ingredient: true,
              measurmentUnit: true,
            },
          },
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
        categoryTitle,
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
            connect: { title: categoryTitle },
          },
        },
      });
    }),
  updateRecipe: protectedProcedure
    .input(updateRecipeSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        id,
        title,
        imageUrl,
        cookingTime,
        difficultyLevel,
        details,
        categoryId,
      } = input;
      const existingRecipe = await ctx.db.recipe.findFirst({
        where: { id: id },
      });
      if (existingRecipe) {
        return ctx.db.recipe.update({
          where: { id: id },
          data: {
            title: title ?? existingRecipe.title,
            imageUrl: imageUrl ?? existingRecipe.imageUrl,
            cookingTime: cookingTime ?? existingRecipe.cookingTime,
            difficultyLevel: difficultyLevel ?? existingRecipe.difficultyLevel,
            details: details ?? existingRecipe.details,
            category: {
              connect: { id: categoryId },
            },
          },
        });
      }
    }),
  deleteRecipe: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const recipeExist = await ctx.db.recipe.findFirst({
        where: { id: input },
      });
      if (recipeExist) {
        await ctx.db.recipe.delete({ where: { id: input } });
      }
    }),
});
