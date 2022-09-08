import { Challenges } from "../../types";
import WithMedia from "./WithMedia";
import WithOptions from "./WithOptions";
import WithPair from "./WithPair";
import WithQuestionInput from "./WithQuestionInput";

export type ChallengesRsultProps = {
  challenges: Challenges;
  title: string;
  isEditable: boolean;
};

export { WithMedia, WithPair, WithOptions, WithQuestionInput };
