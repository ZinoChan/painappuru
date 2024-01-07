import SearchForm from "./components/Search";
import { api } from "@/trpc/server";

export default async function Home() {
  const categories = await api.category.getCategories.query();

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
          <SearchForm categories={categories} />
        </div>
      </div>
    </section>
  );
}
