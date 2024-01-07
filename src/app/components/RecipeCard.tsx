import Image from "next/image";
import Link from "next/link";
import Level from "./Level";
import { Timer } from "lucide-react";
import type { DifficultyLevel } from "@prisma/client";

type Props = {
  id: number;
  src: string;
  title: string;
  categoryTitle: string;
  difficultyLevel: DifficultyLevel;
  cookingTime: number;
};

export default function RecipeCard({
  src,
  title,
  id,
  difficultyLevel,
  cookingTime,
  categoryTitle,
}: Props) {
  return (
    <Link href={`/${id}`}>
      <div className="grid h-full grid-cols-2 items-center justify-between rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 md:max-w-xl">
        <Image
          className="h-full max-h-80 w-full rounded-t-lg object-cover md:rounded-none md:rounded-s-lg"
          width={205}
          height={205}
          src={src}
          alt={title}
        />
        <div className="flex flex-col items-start justify-between p-4 leading-normal">
          <h5 className="mb-2 text-left text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
          <Level difficultyLevel={difficultyLevel} />
          <p className="my-3 max-h-6 overflow-hidden text-ellipsis text-sm font-normal text-gray-700">
            <strong>Category:</strong>
            <span className="ml-2">{categoryTitle}</span>
          </p>
          <div className="flex items-center space-x-1 text-sm text-gray-700">
            <span>{cookingTime} min</span>
            <Timer className="text-sm text-gray-500" />
          </div>
        </div>
      </div>
    </Link>
  );
}
