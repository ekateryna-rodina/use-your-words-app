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

export type BaseQuestion = {
  id?: string;
  wordId: string;
  question: string | { words: string[]; meanings: string[] };
  answer?: string | string[] | Record<string, string>;
  options?: string[];
};

export type FillGapQuestion = BaseQuestion & {
  __type: QuestionType.FillGap;
};

export type PronounceQuestion = BaseQuestion & {
  __type: QuestionType.Pronounce;
};

export type TypeWordByPronunciationQuestion = BaseQuestion & {
  __type: QuestionType.TypeWordByPronunciation;
};

export type TypeWordByMeaningQuestion = BaseQuestion & {
  __type: QuestionType.TypeWordByMeaning;
};

export type ChooseMeaningByWordQuestion = BaseQuestion & {
  __type: QuestionType.ChooseMeaningByWord;
};

export type ChooseWordByMeaningQuestion = BaseQuestion & {
  __type: QuestionType.ChooseWordByMeaning;
};

export type ConnectWordsWithMeaningsQuestion = BaseQuestion & {
  __type: QuestionType.ConnectWordsWithMeanings;
};

export type ChooseSynonymByWordQuestion = BaseQuestion & {
  __type: QuestionType.ChooseSynonymByWord;
};

export type ChooseAntonymByWordQuestion = BaseQuestion & {
  __type: QuestionType.ChooseAntonymByWord;
};

export type ChooseWordBySynonymQuestion = BaseQuestion & {
  __type: QuestionType.ChooseWordBySynonym;
};

export type ChooseWordByAntonymQuestion = BaseQuestion & {
  __type: QuestionType.ChooseWordByAntonym;
};

export type Quiz = {
  //TODO: add progress
  id: string;
  name: string;
  challenges: (BaseQuestion & { __type: QuestionType; word?: string })[];
};
