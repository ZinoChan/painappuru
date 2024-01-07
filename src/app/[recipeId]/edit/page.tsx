import { api } from "@/trpc/server";
import EditRecipeForm from "./EditRecipeFrom";

export default async function EditRecipe({
  params,
}: {
  params: { recipeId: string };
}) {
  const [categories, recipe] = await Promise.all([
    api.category.getCategories.query(),
    api.recipe.getById.query(Number(params.recipeId)),
  ]);

  return <EditRecipeForm categories={categories} recipe={recipe} />;
}
