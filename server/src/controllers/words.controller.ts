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
  const { synonyms, antonyms, phrases, meanings, partOfSpeech, ...rest } = word;
  const wordInfo = { ...rest };
  const wordFullInfo = {
    wordInfo,
    partOfSpeech: partOfSpeech as string[],
    synonyms: synonyms as string[],
    antonyms: antonyms as string[],
    phrases: phrases as string[],
    meanings: meanings as string[],
  };
  const newWord = await postWord(wordFullInfo);
  return newWord;
}

export async function updateWord(updateWord: ExistingWord) {
  const { id, word, fileUrl, synonym, antonym, phrase, meaning, partOfSpeech } =
    updateWord;
  try {
    const wordFullInfo = {
      id,
      word,
      fileUrl,
      partOfSpeech,
      synonyms: synonym,
      antonyms: antonym,
      phrases: phrase,
      meanings: meaning,
    };
    const newWord = await putWord(wordFullInfo);
    return newWord;
  } catch (error) {
    throw new Error(error);
  }
}
