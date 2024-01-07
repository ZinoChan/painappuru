"use client";
import { api } from "@/trpc/react";
import { Search } from "lucide-react";
import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import type { Category } from "@prisma/client";

const SearchForm = ({ categories }: { categories: Category[] }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedCategory, setSearchedCategory] = useState("");
  const recipes = api.recipe.searchByIngredients.useQuery(
    { category: searchedCategory, ingredient: searchInput },
    {
      // enabled: searchIngredients.length > 0,
    },
  );
  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
  };

  return (
    <>
      <form className="mx-auto mb-12 max-w-xl">
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900"
        >
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-sm text-gray-400">
            <Search />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 outline-none focus:border-primary-500 focus:ring-primary-500"
            placeholder="Search ingredients..."
            onChange={onSearchInput}
            required
          />
        </div>
      </form>

      <div className="mb-6 flex items-center justify-center">
        <div className="flex items-center justify-center space-x-4">
          <span
            onClick={() => setSearchedCategory("")}
            className="cursor-pointer rounded-full border border-yellow-300 bg-yellow-50 px-4 py-2 text-sm font-medium text-gray-700"
          >
            All
          </span>
          {categories.map((category) => (
            <span
              key={category.id}
              className="cursor-pointer rounded-full border border-yellow-300 bg-yellow-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-yellow-100"
              onClick={() => setSearchedCategory(category.title)}
            >
              {category.title}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {recipes?.data?.length! > 0 ? (
          recipes?.data?.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              src={recipe.imageUrl}
              title={recipe.title}
              categoryTitle={recipe.categoryTitle}
              difficultyLevel={recipe.difficultyLevel}
              cookingTime={recipe.cookingTime}
            />
          ))
        ) : (
          <div className="col-span-3 flex min-h-64 justify-center py-8 text-3xl">
            <h3>No Recipe found</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchForm;
