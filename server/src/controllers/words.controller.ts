import { getWords, postWord } from "../services/words.service";
import { Word } from "../types/Word";

export async function getAllWords() {
  try {
    const words = await getWords();
    return words;
  } catch (error) {
    throw new Error(error);
  }
}
export async function saveWord(word: Word) {
  const { synonyms, antonyms, phrases, partOfSpeech, ...rest } = word;
  try {
    const wordInfo = { ...rest };
    console.log(word);
    const newWord = await postWord({
      wordInfo,
      partOfSpeech,
      synonyms,
      antonyms,
      phrases,
    });
    return newWord;
  } catch (error) {
    throw new Error(error);
  }
}
