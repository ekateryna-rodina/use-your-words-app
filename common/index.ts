export type Word = {
  word: string;
  fileUrl: string;
  meanings: string[] | { id?: string; value: string }[];
  partOfSpeech: string[] | { id?: string; value: string }[];
  phrases: string[] | { id?: string; value: string }[];
  synonyms: string[] | { id?: string; value: string }[];
  antonyms: string[] | { id?: string; value: string }[];
};

export type WordWithId = Word & { id: string };

export enum QuestionType {
  FillGap,
  Pronounce,
  TypeWordByPronunciation,
  TypeWordByMeaning,
  ChooseMeaningByWord,
  ChooseWordByMeaning,
  ConnectWordsWithMeanings,
  ChooseSynonymByWord,
  ChooseAntonymByWord,
  ChooseWordBySynonym,
  ChooseWordByAntonym,
}
