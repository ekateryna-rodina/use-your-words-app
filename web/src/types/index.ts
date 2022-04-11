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
  | "fill-dark-500";

export enum MenuItem {
  Home,
  History,
  User,
}

export type Quiz = {
  quizId: string;
  quizNumber: number;
  words: string[];
  isEnabled: boolean;
  successLevel: SuccessLevels;
};
