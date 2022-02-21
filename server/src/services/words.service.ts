import ApiError from "../error/apiError";
import db from "../models";
import { executeTransaction } from "./wordsApi.transaction";

const getWords = async () => {
  try {
    const words = await db.Word.findAll();
    // const phrases = await db.Phrase.findAll({
    //   include: db.Word,
    // });
    const all = await db.Word.findAll({
      include: [db.Phrase, db.Meaning, db.Synonym, db.Antonym, db.PartOfSpeech],
    });
    console.log(all);
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
const postWord = async (wordFullInfo: PostWord) => {
  try {
    executeTransaction(wordFullInfo);
  } catch (error) {
    return new ApiError(error.code, error.message);
  }
};

export { getWords, postWord };
