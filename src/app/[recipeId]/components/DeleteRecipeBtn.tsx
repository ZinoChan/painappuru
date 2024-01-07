"use client";
import { api } from "@/trpc/react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteRecipeBtn({ recipeId }: { recipeId: string }) {
  const router = useRouter();
  const { mutate, isLoading } = api.recipe.deleteRecipe.useMutation({
    onSuccess: () => {
      toast.success("recipe deleted");
      router.push(`/`);
    },
    onError: (error) => toast.error(error.message),
  });
  const deleteRecipe = () => {
    mutate(Number(recipeId));
  };
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-light-100/80">
          Loading...
        </div>
      )}
      <button
        className="rounded bg-red-500 px-2 py-1 text-right text-sm text-white focus:outline-none"
        onClick={deleteRecipe}
      >
        <Trash />
      </button>
    </>
  );
}
