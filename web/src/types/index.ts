import { QuestionType, WordWithId } from "use-your-words-common";

export enum SuccessLevels {
  Novice,
  FromNoviceToImproved,
  Improved,
  FromImprovedToMaster,
  Master,
}

export type FillColor =
  | "fill-green"
  | "fill-yellow"
  | "fill-gray-300"
  | "fill-gray-800"
  | "fill-light"
  | "fill-red"
  | "fill-purple"
  | "fill-dark-500"
  | "fill-dark-800";

export enum MenuItem {
  Home,
  History,
  User,
}

export type Quiz = {
  quizId: string;
  quizNumber: number;
  words: Record<string, WordWithId>;
  isEnabled: boolean;
  successLevel: SuccessLevels;
};
// PRACTICE
export enum ChallengeResults {
  None,
  Success,
  Failure,
}
export type QuizChallengesResult = Record<
  string,
  {
    result: ChallengeResults;
    dateUpdated: Date;
  }
>;
export type UpdateQuizChallenge = {
  quizId: string;
  challengeId: string;
  result: ChallengeResults;
  dateUpdated: Date;
};
export type QuizResult = {
  progress: number;
  challenges: QuizChallengesResult;
};
export type QuizProgress = {
  quizId: string;
  progress: number;
};
export enum PracticeCardPosition {
  Front,
  Middle,
  Back,
}

export const ChallengeTitles: Record<QuestionType, string> = {
  [QuestionType.FillGap]: "Fill a gap in the sentence",
  [QuestionType.Pronounce]: "Pronounce this word",
  [QuestionType.TypeWordByPronunciation]: "What the word do you hear?",
  [QuestionType.TypeWordByMeaning]: "What word is this?",
  [QuestionType.ChooseMeaningByWord]: "Choose correct definition for this word",
  [QuestionType.ChooseWordByMeaning]: "Choose correct word for this definition",
  [QuestionType.ConnectWordsWithMeanings]: "Connect definitions with words",
  [QuestionType.ChooseSynonymByWord]:
    "What is the closest synonym to this word?",
  [QuestionType.ChooseAntonymByWord]:
    "What is the closest synonym to this word?",
  [QuestionType.ChooseWordBySynonym]:
    "What is the closest word to this synonym?",
  [QuestionType.ChooseWordByAntonym]:
    "What is the closest word to this antonym?",
};
