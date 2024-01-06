import { api } from "@/trpc/server";
import RecipeCard from "./components/RecipeCard";
import SearchForm from "./components/Search";

export default async function Home() {
  const [recipes, categories] = await Promise.all([
    api.recipe.getRecipes.query(),
    api.category.getCategories.query(),
  ]);
  return (
    <section className="py-16">
      <div className="mx-auto max-w-screen-xl px-2">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-medium text-gray-800">
            Delightful Dishes
          </h1>
          <p className="mx-auto mb-4 max-w-md text-sm text-gray-500">
            Dive into a world of flavors where passionate home chefs and food
            enthusiasts unite.
          </p>
          <SearchForm />
        </div>
        <div className="mb-6 flex items-center justify-center">
          <div className="flex items-center justify-center space-x-4">
            <span className="rounded-full border border-yellow-300 bg-yellow-50 px-4 py-2 text-sm font-medium text-gray-700">
              All
            </span>
            {categories.map((category) => (
              <span
                key={category.id}
                className="rounded-full border border-yellow-300 bg-yellow-50 px-4 py-2 text-sm font-medium text-gray-700"
              >
                {category.title}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              src={recipe.imageUrl}
              title={recipe.title}
              details={recipe.details}
              difficultyLevel={recipe.difficultyLevel}
              cookingTime={recipe.cookingTime}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
