import { QuestionType, Quiz } from "use-your-words-common";

export const stringify = (obj: any) => {
  const stringified = Object.keys(obj).reduce(
    (acc: Partial<Quiz & { type: string }>, curr: string) => {
      if (curr === "__type") {
        const type: string =
          QuestionType[obj[curr as keyof typeof QuestionType]];
        acc.type = type;
        return acc;
      }
      acc[curr] =
        typeof obj[curr] === "object" || Array.isArray(obj[curr])
          ? JSON.stringify(obj[curr])
          : obj[curr];
      return acc;
    },
    {}
  );
  return stringified;
};
