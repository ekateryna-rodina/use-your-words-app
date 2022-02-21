export type Word = {
  word: string;
  meaning: string;
  fileUrl: string;
  partOfSpeech: string | number | [];
  phrases: string;
  synonyms: string;
  antonyms: string;
};

export type WordOutput = Word & { id: string; partOfSpeech: string };
