import { z } from "zod";

export const ingredientSchema = z.object({
  ingredients: z.array(
    z.object({
      ingredientTitle: z.string(),
      measurmentUnitTitle: z.string(),
      recipeId: z.number(),
      measurmentQty: z.number(),
    }),
  ),
});

export const updateIngredientSchema = z.object({
  ingredients: z.array(
    z.object({
      recipeIngredientId: z.number(),
      ingredientTitle: z.string(),
      measurmentUnitTitle: z.string(),
      recipeId: z.number(),
      measurmentQty: z.number(),
    }),
  ),
});
export type ingredientSchemaType = z.infer<typeof ingredientSchema>;
export type updateIngredientSchemaType = z.infer<typeof updateIngredientSchema>;
