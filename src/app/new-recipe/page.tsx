import { api } from "@/trpc/server";
import AddRecipeForm from "./AddRecipeForm";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
export default async function AddRecipe() {
  const [session, categories] = await Promise.all([
    getServerAuthSession(),
    api.category.getCategories.query(),
  ]);
  if (!session?.user.id) redirect(`/api/auth/signin?callbackUrl=/new-recipe`);

  return (
    <section className="py-8">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-medium text-gray-800">
          Contribute Your Culinary <br /> Masterpiece
        </h2>
        <p className="mx-auto mb-4 max-w-md text-sm text-gray-500">
          Share the magic of your kitchen by adding your unique recipe to our
          growing collection!
        </p>
      </div>
      <AddRecipeForm categories={categories} />;
    </section>
  );
}
