import ApiError from "../error/apiError";
import { executeTransaction } from "./wordsApi.transaction";

const getWords = async () => {
  try {
    return [];
  } catch (error) {
    console.log(error);
    return null;
  }
};
type PostWord = {
  wordInfo: {
    word: string;
    fileUrl: string;
  };
  partOfSpeech: string[];
  synonyms: string[];
  antonyms: string[];
  phrases: string[];
  meanings: string[];
};
const postWord = async (wordFullInfo: PostWord) => {
  try {
    executeTransaction(wordFullInfo);
  } catch (error) {
    return new ApiError(error.code, error.message);
  }
};

export { getWords, postWord };
