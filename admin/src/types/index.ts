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
};

export type WordWithId = Word & { id: string };
