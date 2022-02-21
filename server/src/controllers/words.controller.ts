import { getWords, postWord, putWord } from "../services/words.service";
import { ExistingWord, Word } from "../types/Word";

export async function getAllWords() {
  try {
    const words = await getWords();
    return words;
  } catch (error) {
    throw new Error(error);
  }
}
export async function saveWord(word: Word) {
  const { synonyms, antonyms, phrases, meaning, partOfSpeech, ...rest } = word;
  try {
    const wordInfo = { ...rest };
    const wordFullInfo = {
      wordInfo,
      partOfSpeech,
      synonyms: synonyms.split("|"),
      antonyms: antonyms.split("|"),
      phrases: phrases.split("|"),
      meanings: meaning.split("|"),
    };
    const newWord = await postWord(wordFullInfo);
    return newWord;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateWord(word: ExistingWord) {
  const { id, synonyms, antonyms, phrases, meaning, partOfSpeech, ...rest } =
    word;
  try {
    const wordInfo = { ...rest };
    const wordFullInfo = {
      id,
      wordInfo,
      partOfSpeech,
      synonyms: synonyms.split("|"),
      antonyms: antonyms.split("|"),
      phrases: phrases.split("|"),
      meanings: meaning.split("|"),
    };
    const newWord = await putWord(wordFullInfo);
    return newWord;
  } catch (error) {
    throw new Error(error);
  }
}
