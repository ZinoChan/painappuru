import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import DeleteRecipeBtn from "./components/DeleteRecipeBtn";

export default async function RecipeDetails({
  params,
}: {
  params: { recipeId: string };
}) {
  const recipe = await api.recipe.getRecipeDetails.query(
    Number(params.recipeId),
  );
  const session = await getServerAuthSession();
  const createdByCurrUser = recipe?.createdById === session?.user?.id;

  if (recipe)
    return (
      <section className="mx-auto my-8 max-w-screen-md px-4">
        <div className="mb-4 flex items-baseline justify-between">
          <h1 className="text-5xl font-bold">{recipe.title}</h1>
          {createdByCurrUser && (
            <div className="flex space-x-2">
              <DeleteRecipeBtn recipeId={params.recipeId} />
              <Link
                href={`/${params.recipeId}/edit`}
                className="rounded bg-fuchsia-800 px-3 py-1 text-sm font-medium text-white hover:bg-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              >
                edit
              </Link>
            </div>
          )}
        </div>
        <div className="prose">
          <Image
            width={768}
            height={400}
            src={recipe.imageUrl}
            alt={recipe.title}
            className="mb-6"
          />

          <div className=" flex items-center justify-between ">
            <p className="text-gray-800">
              <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
            </p>
            <p className="text-gray-800">
              <strong>Category:</strong> {recipe.category.title}
            </p>
          </div>

          <div className="">
            <strong>Difficulty Level:</strong> {recipe.difficultyLevel}
          </div>

          <div className="prose ">
            <strong>Details:</strong> <br />
            <Markdown>{recipe.details}</Markdown>
          </div>

          <h2 className="mb-2 text-2xl font-bold">Ingredients:</h2>
          <ul>
            {recipe.recipeIngredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.measurmentQty} {ingredient.measurmentUnit.title}{" "}
                {ingredient.ingredient.title}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );

  return <div>recipe not found</div>;
}
