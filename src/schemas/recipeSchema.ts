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

export const updateRecipeSchema = z.object({
  recipeId: z.number(),
  title: z.string().optional(),
  imageUrl: z.string().optional(),
  cookingTime: z.number().optional(),
  difficultyLevel: z.nativeEnum(DifficultyLevel).optional(),
  details: z.string().optional(),
  categoryTitle: z.string().optional(),
});

export type recipeSchemaType = z.infer<typeof recipeSchema>;
export type updateRecipeSchemaType = z.infer<typeof updateRecipeSchema>;
