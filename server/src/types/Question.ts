// TODO: move to a package
export enum QuestionType {
  FillGap = "Fill the gap",
  Pronounce = "Pronounce the word",
  TypeWordByPronunciation = "Type the word you heard",
  TypeWordByMeaning = "What a word does match the meaning",
  ChooseMeaningByWord = "Given a word. What is the closest meaning?",
  ChooseWordByMeaning = "Given a meaning. What is the closest word?",
  ConnectWordsWithMeanings = "Connect meanings with words",
  ChooseSynonymByWord = "What is the synonym to the word?",
  ChooseAntonymByWord = "What is the antonym to the word?",
  ChooseWordBySynonym = "What is the word associated with the synonym?",
  ChooseWordByAntonym = "What is the word associated with the antonym?",
}

export type BaseQuestion = {
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
  id: string;
  name: string;
  questions: [];
};
