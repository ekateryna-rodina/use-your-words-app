export type WordData = {
  value: {
    id?: string;
    value: string;
  };
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

export type ExistingWord = Word & {
  id: string;
  partOfSpeech: string;
  antonym: WordData[];
  synonym: WordData[];
  phrase: WordData[];
  meaning: WordData[];
};
