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
};

export type FillGapQuestion = BaseQuestion & {
  __type: QuestionType.FillGap;
  answer: string;
  phrase: string;
};

export type PronounceQuestion = BaseQuestion & {
  __type: QuestionType.Pronounce;
  fileUrl: string;
};

export type TypeWordByPronunciationQuestion = BaseQuestion & {
  __type: QuestionType.TypeWordByPronunciation;
  fileUrl: string;
  answer: string;
};

export type TypeWordByMeaningQuestion = BaseQuestion & {
  __type: QuestionType.TypeWordByMeaning;
  meaning: string;
  answer: string;
};

export type ChooseMeaningByWordQuestion = BaseQuestion & {
  __type: QuestionType.ChooseMeaningByWord;
  options: string[];
  answer: string;
};

export type ChooseWordByMeaningQuestion = BaseQuestion & {
  __type: QuestionType.ChooseWordByMeaning;
  options: string[];
  answer: string;
};
