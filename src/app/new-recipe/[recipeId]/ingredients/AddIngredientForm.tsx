"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ingredientSchema } from "@/schemas/ingredientSchema";
import type { ingredientSchemaType } from "@/schemas/ingredientSchema";
import { Plus, Trash } from "lucide-react";
import type { Ingredient, measurmentUnit } from "@prisma/client";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  ingredients: Ingredient[];
  measurmentUnits: measurmentUnit[];
  recipeId: string;
};

const IngredientForm = ({ ingredients, measurmentUnits, recipeId }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ingredientSchemaType>({
    resolver: zodResolver(ingredientSchema),
  });
  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const { mutate, isLoading } = api.ingredient.addIngredient.useMutation({
    onSuccess: () => {
      toast.success("ingredients added");
      router.push(`/`);
    },
    onError: (error) => toast.error(error.message),
  });
  const onSubmit = (data: ingredientSchemaType) => {
    mutate({ ingredients: data.ingredients });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-8 max-w-xl rounded-md bg-white p-4 shadow-md"
    >
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-light-100/80">
          Loading...
        </div>
      )}
      <h2 className="mb-4 text-2xl font-semibold">Ingredients</h2>
      {fields.map((ingredient, index) => (
        <div
          key={ingredient.id}
          className="mb-4 rounded-md border border-gray-300 p-4"
        >
          <label className="block text-sm font-medium text-gray-600">
            Ingredient
          </label>
          <input
            {...register(`ingredients.${index}.ingredientTitle`)}
            className="mt-1 w-full rounded-md border p-2 focus:border-primary-500 focus:outline-none "
            list={`ingredientsList-${index}`}
          />
          <datalist id={`ingredientsList-${index}`}>
            {ingredients.map((option) => (
              <option key={option.id} value={option.title} />
            ))}
          </datalist>

          <label className="block text-sm font-medium text-gray-600">
            Measurement Unit
          </label>
          <input
            {...register(`ingredients.${index}.measurmentUnitTitle`)}
            defaultValue={ingredient.measurmentUnitTitle}
            list={`measurementUnitsList-${index}`}
            className="mt-1 w-full rounded-md border p-2 focus:border-primary-500 focus:outline-none "
          />
          <datalist id={`measurementUnitsList-${index}`}>
            {measurmentUnits.map((option) => (
              <option key={option.id} value={option.title} />
            ))}
          </datalist>

          <label className="block text-sm font-medium text-gray-600">
            Measurement Quantity
          </label>
          <input
            {...register(`ingredients.${index}.measurmentQty`, {
              valueAsNumber: true,
            })}
            defaultValue={ingredient.measurmentQty}
            className="mt-1 w-full rounded-md border p-2 focus:border-primary-500 focus:outline-none "
            type="number"
          />

          <button
            type="button"
            onClick={() => remove(index)}
            className="mt-4 rounded-md bg-red-500 px-2 py-1 text-right text-sm text-white focus:outline-none"
          >
            <Trash />
          </button>
        </div>
      ))}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => {
            append({
              ingredientTitle: "",
              measurmentUnitTitle: "",
              recipeId: Number(recipeId),
              measurmentQty: 0,
            });
          }}
          className="mt-4 rounded-md bg-gray-600 px-2 py-1 text-white focus:outline-none"
        >
          <Plus />
        </button>

        <button
          type="submit"
          className="mt-4 rounded-md bg-primary-500 px-4 py-2 text-white focus:outline-none"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default IngredientForm;
