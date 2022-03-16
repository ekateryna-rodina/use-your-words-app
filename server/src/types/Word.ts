export type WordData = {
  id?: string;
  value: string;
  name: string;
};
export type Word = {
  word: string;
  meanings: string[] | WordData[];
  fileUrl: string;
  partOfSpeech: string[] | WordData[];
  phrases: string[] | WordData[];
  synonyms: string[] | WordData[];
  antonyms: string[] | WordData[];
};

export type ExistingWord = Word & { id: string; partOfSpeech: string };
