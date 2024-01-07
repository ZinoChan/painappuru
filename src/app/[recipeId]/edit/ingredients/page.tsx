import { api } from "@/trpc/server";
import EditIngredientForm from "./EditIngredientsFrom";

export default async function EditIngredient({
  params,
}: {
  params: { recipeId: string };
}) {
  const [ingredients, measurmentUnits, recipe, recipeIngredients] =
    await Promise.all([
      api.ingredient.getAllIngredients.query(),
      api.measurmentUnit.getMeasurmentUnits.query(),
      api.recipe.getById.query(Number(params.recipeId)),
      api.ingredient.getRecipeIngredients.query(Number(params.recipeId)),
    ]);
  return (
    <section className="py-8">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-medium text-gray-800">
          Recipe: {recipe?.title}
        </h2>
        <p className="mx-auto mb-4 max-w-md text-sm text-gray-500">
          Edit Ingredients
        </p>
      </div>
      <EditIngredientForm
        ingredients={ingredients}
        measurmentUnits={measurmentUnits}
        recipeId={params.recipeId}
        recipeIngredients={recipeIngredients}
      />
    </section>
  );
}
