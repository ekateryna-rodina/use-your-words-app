import { BaseQuestion, QuestionType } from "use-your-words-common";

export type PronunciationType = "autofill" | "upload" | "record";

export type PartOfSpeech = {
  id: string;
  value: string;
};

export type Challenge = BaseQuestion & {
  __type: QuestionType;
  isSelected: boolean;
  word?: string;
};
export type Challenges = Challenge[];

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

// export type WordWithId = Word & { id: string };

export type Tabs = "vocabulary" | "quizzes";
