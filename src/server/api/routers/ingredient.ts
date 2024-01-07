import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import {
  ingredientSchema,
  updateIngredientSchema,
} from "@/schemas/ingredientSchema";

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

  getRecipeIngredients: protectedProcedure
    .input(z.number())
    .query(({ ctx, input }) => {
      return ctx.db.recipeIngredient.findMany({
        where: { recipeId: input },
        include: {
          ingredient: true,
          measurmentUnit: true,
        },
      });
    }),
  updateRecipeIngredients: protectedProcedure
    .input(updateIngredientSchema)
    .mutation(async ({ ctx, input }) => {
      const updateIngredientPromises = input.ingredients.map(
        async (ingredient) => {
          const existingRecipeIngredient =
            await ctx.db.recipeIngredient.findUnique({
              where: { id: ingredient.recipeIngredientId },
              include: {
                ingredient: true,
                measurmentUnit: true,
              },
            });

          if (existingRecipeIngredient) {
            return ctx.db.recipeIngredient.update({
              where: { id: ingredient.recipeIngredientId },
              data: {
                measurmentQty:
                  ingredient.measurmentQty ??
                  existingRecipeIngredient.measurmentQty,
                measurmentUnit: {
                  connectOrCreate: {
                    where: {
                      title:
                        ingredient.measurmentUnitTitle ||
                        existingRecipeIngredient.measurmentUnit.title,
                    },
                    create: {
                      title:
                        ingredient.measurmentUnitTitle ||
                        existingRecipeIngredient.measurmentUnit.title,
                    },
                  },
                },
                ingredient: {
                  connectOrCreate: {
                    where: {
                      title:
                        ingredient.ingredientTitle ||
                        existingRecipeIngredient.ingredient.title,
                    },
                    create: {
                      title:
                        ingredient.ingredientTitle ||
                        existingRecipeIngredient.ingredient.title,
                    },
                  },
                },
              },
            });
          }
        },
      );

      await Promise.all(updateIngredientPromises);
    }),
  delRecipeIngredient: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const ingredientExist = await ctx.db.recipeIngredient.findFirst({
        where: { id: input },
      });
      if (ingredientExist) {
        await ctx.db.recipeIngredient.delete({ where: { id: input } });
      }
    }),
});
