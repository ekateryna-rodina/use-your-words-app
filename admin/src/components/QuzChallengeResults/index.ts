import { BaseQuestion, QuestionType } from "use-your-words-common";
import WithMedia from "./WithMedia";
import WithOptions from "./WithOptions";
import WithPair from "./WithPair";
import WithQuestionInput from "./WithQuestionInput";

type Challenges = (BaseQuestion & {
  __type: QuestionType;
  isSelected: boolean;
  word?: string;
})[];
export type ChallengesRsultProps = {
  challenges: Challenges;
  title: string;
};

export { WithMedia, WithPair, WithOptions, WithQuestionInput };
