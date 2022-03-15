import ApiError from "../error/apiError";
import db from "../models";
import { mapToWords } from "../utils/mapToObject";
import { executeTransaction } from "./wordsApi.transaction";

const getWords = async () => {
  try {
    const result = await db.Word.findAll({
      include: [db.Phrase, db.Meaning, db.Synonym, db.Antonym, db.PartOfSpeech],
    });
    const words = mapToWords(result);
    return words;
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
type PutWord = PostWord & { id: string };
const postWord = async (wordFullInfo: PostWord) => {
  try {
    executeTransaction(wordFullInfo);
  } catch (error) {
    return new ApiError(error.code, error.message);
  }
};

const putWord = async (wordFullInfo: PutWord) => {
  const id = wordFullInfo.id;

  try {
    console.log(wordFullInfo);
  } catch (error) {
    return new ApiError(error.code, error.message);
  }
};

export { getWords, postWord, putWord };
