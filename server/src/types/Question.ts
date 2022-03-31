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
  question: string;
  answer: string | string[];
  options?: string[];
};

export type FillGapQuestion = BaseQuestion & {
  __type: QuestionType.FillGap;
};

export type PronounceQuestion = Omit<BaseQuestion, "answer"> & {
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

export type ConnectWordsWithMeaningsQuestion = Omit<
  BaseQuestion,
  "question" | "answer"
> & {
  __type: QuestionType.ConnectWordsWithMeanings;
  question: { words: string[]; meanings: string[] };
  answer: Record<string, string>;
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
