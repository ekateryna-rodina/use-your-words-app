export type Value = {
  id?: string;
  value: string;
};
export type WordData = {
  value: {
    id?: string;
    value: string;
  };
};
export type Word = {
  word: string;
  meanings: string[] | WordData[] | Value[];
  fileUrl: string;
  partOfSpeech: string[] | WordData[];
  phrases: string[] | WordData[] | Value[];
  synonyms: string[] | WordData[] | Value[];
  antonyms: string[] | WordData[] | Value[];
};

export type ExistingWord = Word & {
  id: string;
  partOfSpeech: string;
  antonym: WordData[];
  synonym: WordData[];
  phrase: WordData[];
  meaning: WordData[];
};
