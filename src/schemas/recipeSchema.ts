import { DifficultyLevel } from "@prisma/client";
import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string(),
  imageUrl: z.string(),
  cookingTime: z.number(),
  difficultyLevel: z.nativeEnum(DifficultyLevel),
  details: z.string(),
  categoryId: z.number(),
  ingredients: z.array(
    z.object({
      title: z.string(),
      quantity: z.string(),
    }),
  ),
  tags: z.array(
    z.object({
      title: z.string(),
    }),
  ),
});
