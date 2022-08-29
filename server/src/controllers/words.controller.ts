import {
  deleteWord,
  getPartsOfSpeech,
  getWords,
  postWord,
  putWord,
} from "../services/words.service";
import { ExistingWord, Word, WordData } from "../types/Word";

export async function getAllWords() {
  try {
    const words = await getWords();
    return words;
  } catch (error) {
    throw new Error(error);
  }
}
export async function saveWord(word: Word) {
  const { synonyms, antonyms, phrases, meanings, partOfSpeech, ...rest } = word;
  const wordInfo = { ...rest };
  const wordFullInfo = {
    wordInfo,
    partOfSpeech: partOfSpeech as string[],
    synonyms: synonyms.map((s) => s.value) as string[],
    antonyms: antonyms.map((a) => a.value) as string[],
    phrases: phrases.map((p) => p.value) as string[],
    meanings: meanings.map((m) => m.value) as string[],
  };
  const newWord = await postWord(wordFullInfo);
  return newWord;
}

export async function updateWord(data: ExistingWord) {
  const { id, synonyms, antonyms, phrases, meanings } = data;
  try {
    const wordFullInfo = {
      id,
      synonyms: synonyms as WordData[],
      antonyms: antonyms as WordData[],
      phrases: phrases as WordData[],
      meanings: meanings as WordData[],
    };
    const newWord = await putWord(wordFullInfo);
    return newWord;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function dropWord(id: string) {
  try {
    await deleteWord(id);
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
}

export async function fetchPartsOfSpeech() {
  try {
    const parts = await getPartsOfSpeech();
    return parts;
  } catch (error) {
    return null;
  }
}
