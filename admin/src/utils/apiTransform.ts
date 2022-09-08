import { BaseQuestion, QuestionType } from "use-your-words-common";
import { Challenges } from "../types";

export const isEqualType = (current: QuestionType, target: number) =>
  (current as unknown as string) === (QuestionType[target] as string);

// Avoid additional join on server. Temp?
const transformChallenges = (
  challenges: Challenges,
  isEqualTypeFunc: Function,
  isSelected: undefined | true = undefined
) => {
  // TODO: this is a dirty solution :()
  const nameById = challenges
    .filter((c) => isEqualTypeFunc(c.__type, QuestionType.FillGap))
    .reduce(
      (
        acc: { [id: string]: string },
        curr: BaseQuestion & {
          __type: QuestionType;
        }
      ) => {
        const id = curr.wordId;
        acc[id] = curr.answer as string;
        return acc;
      },
      {}
    );
  const challengesModified = challenges.map((c) => ({
    ...c,
    word: nameById[c.wordId],
    isSelected,
  }));
  return challengesModified;
};

export { transformChallenges };
