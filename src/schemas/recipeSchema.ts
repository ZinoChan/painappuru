import { DifficultyLevel } from "@prisma/client";
import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string(),
  imageUrl: z.string(),
  cookingTime: z.number(),
  difficultyLevel: z.nativeEnum(DifficultyLevel),
  details: z.string(),
  categoryTitle: z.string(),
});

export type recipeSchemaType = z.infer<typeof recipeSchema>;

export const updateRecipeSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  imageUrl: z.string().optional(),
  cookingTime: z.number().optional(),
  difficultyLevel: z.nativeEnum(DifficultyLevel).optional(),
  details: z.string().optional(),
  categoryId: z.number().optional(),
  ingredients: z
    .array(
      z.object({
        title: z.string().optional(),
        quantity: z.string().optional(),
      }),
    )
    .optional(),
  tags: z
    .array(
      z.object({
        title: z.string().optional(),
      }),
    )
    .optional(),
});
