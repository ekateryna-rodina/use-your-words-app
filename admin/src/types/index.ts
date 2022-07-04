export type PronunciationType = "autofill" | "upload" | "record";

export type PartOfSpeech = {
  id: string;
  value: string;
};

export type FormValue = { id?: string; value: string };
export type Word = {
  word: string;
  fileUrl: string;
  meanings: string[] | FormValue[];
  partOfSpeech: string[] | FormValue[];
  phrases: string[] | FormValue[];
  synonyms: string[] | FormValue[];
  antonyms: string[] | FormValue[];
  pronunciationRadio: PronunciationType;
  uploadPronunciation?: string;
  recordPronunciation?: string;
};

export type WordWithId = Word & { id: string };

// export enum QuestionType {
//   FillGap = "Fill the gap",
//   Pronounce = "Pronounce the word",
//   TypeWordByPronunciation = "Type the word you heard",
//   TypeWordByMeaning = "What a word does match the meaning",
//   ChooseMeaningByWord = "Given a word. What is the closest meaning?",
//   ChooseWordByMeaning = "Given a meaning. What is the closest word?",
//   ConnectWordsWithMeanings = "Connect meanings with words",
//   ChooseSynonymByWord = "What is the synonym to the word?",
//   ChooseAntonymByWord = "What is the antonym to the word?",
//   ChooseWordBySynonym = "What is the word associated with the synonym?",
//   ChooseWordByAntonym = "What is the word associated with the antonym?",
// }

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
  wordId: string;
  question: string | { words: string[]; meanings: string[] };
  answer?: string | string[] | Record<string, string>;
  options?: string[];
};

export type Quiz = {
  id: string;
  name?: string;
  questions: (BaseQuestion & { __type: QuestionType })[];
};

export type Tabs = "vocabulary" | "quizzes";
