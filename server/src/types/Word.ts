export type Word = {
  word: string;
  meaning: string;
  fileUrl: string;
  partOfSpeech: string[];
  phrases: string;
  synonyms: string;
  antonyms: string;
};

export type ExistingWord = Word & { id: string; partOfSpeech: string };
