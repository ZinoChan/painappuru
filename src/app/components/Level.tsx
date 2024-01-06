import { DifficultyLevel } from "@prisma/client";

const Level = ({ difficultyLevel }: { difficultyLevel: DifficultyLevel }) => {
  if (difficultyLevel == "DIFFICULT")
    return (
      <span className="rounded-full bg-red-50 px-2 py-1 text-sm text-red-500">
        {difficultyLevel}
      </span>
    );
  else if (difficultyLevel == "MODERATE")
    return (
      <span className="rounded-full bg-yellow-50 px-2 py-1 text-sm text-yellow-500 ">
        {difficultyLevel}
      </span>
    );
  return (
    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-sm text-green-500">
      {difficultyLevel}
    </span>
  );
};

export default Level;
