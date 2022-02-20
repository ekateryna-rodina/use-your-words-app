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
  const { synonyms, antonyms, phrases, meaning, partOfSpeech, ...rest } = word;
  try {
    const wordInfo = { ...rest };
    console.log(word);
    console.log(wordInfo, "info");
    const newWord = await postWord({
      wordInfo,
      partOfSpeech,
      synonyms: synonyms.split("|"),
      antonyms: antonyms.split("|"),
      phrases: phrases.split("|"),
      meanings: meaning.split("|"),
    });
    return newWord;
  } catch (error) {
    throw new Error(error);
  }
}
