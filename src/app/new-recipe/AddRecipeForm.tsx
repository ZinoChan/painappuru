"use client";
import { useForm } from "react-hook-form";
import { recipeSchema, recipeSchemaType } from "@/schemas/recipeSchema";
import { Category, DifficultyLevel } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uplaodthing";

export default function AddRecipeForm({
  categories,
}: {
  categories: Category[];
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<recipeSchemaType>({
    resolver: zodResolver(recipeSchema),
  });

  const router = useRouter();

  const { mutate, error, isLoading } = api.recipe.addRecipe.useMutation({
    onSuccess: (data) => {
      reset();
      router.push(`/new-recipe/${data.id}/ingredients`);
    },
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = (data: recipeSchemaType) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-8 max-w-screen-md rounded-lg bg-white p-6 shadow-md"
    >
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-light-100/80">
          Loading...
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Recipe Title
          </label>
          <input
            {...register("title")}
            className="mt-1 w-full rounded-md border p-2 focus:border-primary-500 focus:outline-none "
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="cookingTime"
            className="block text-sm font-medium text-gray-700"
          >
            Cooking Time (min)
          </label>
          <input
            {...register("cookingTime", {
              valueAsNumber: true,
            })}
            type="number"
            inputMode="numeric"
            className="mt-1 w-full rounded-md border p-2 focus:border-primary-500 focus:outline-none "
          />
          {errors.cookingTime && (
            <p className="text-sm text-red-500">{errors.cookingTime.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="difficultyLevel"
            className="block text-sm font-medium text-gray-700"
          >
            Difficulty Level
          </label>
          <select
            {...register("difficultyLevel")}
            className="mt-1 w-full rounded-md border p-2 focus:border-primary-500 focus:outline-none "
          >
            {Object.values(DifficultyLevel).map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="categoryTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            {...register("categoryTitle")}
            className="mt-1 w-full rounded-md border p-2 focus:border-primary-500 focus:outline-none "
          >
            {categories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
          {errors.categoryTitle && (
            <p className="text-sm text-red-500">
              {errors.categoryTitle.message}
            </p>
          )}
        </div>
      </div>
      <label
        htmlFor="details"
        className="mt-4 block text-sm font-medium text-gray-700"
      >
        Recipe Instructions
      </label>
      <textarea
        {...register("details")}
        className="mt-1 w-full rounded-md border p-2 focus:border-primary-500 focus:outline-none"
        rows={5}
      />
      {errors.details && (
        <p className="text-sm text-red-500">{errors.details.message}</p>
      )}
      <div className="mt-4">
        <label
          htmlFor="details"
          className="mt-4 block text-sm font-medium text-gray-700"
        >
          Upload Image
        </label>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setValue("imageUrl", res[0]?.url || "");
            toast("Image Upload Completed");
          }}
          onUploadError={(error: Error) => {
            toast.error(`ERROR! ${error.message}`);
          }}
        />
        {errors.imageUrl && (
          <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="hover:bg-primary-600 mt-4 rounded-md bg-primary-500 px-4 py-2 font-medium text-white hover:bg-green-400 focus:border-green-600 focus:outline-none "
      >
        Submit
      </button>
    </form>
  );
}
