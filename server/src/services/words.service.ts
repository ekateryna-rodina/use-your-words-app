import ApiError from "../error/apiError";
import db from "../models";
import { mapToWords } from "../utils/mapToObject";
import { executeTransaction } from "./wordsApi.transaction";

const getWords = async () => {
  try {
    const result = await db.Word.findAll({
      include: [
        { model: db.Phrase, separate: true },
        { model: db.Meaning, separate: true },
        { model: db.Synonym, separate: true },
        { model: db.Antonym, separate: true },
        { model: db.PartOfSpeech, separate: false },
      ],
    });
    const words = mapToWords(result);
    return words;
  } catch (error) {
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
const toObject = (response: {
  id: string;
  word: string;
  fileUrl: string;
  partsOfSpeech: [];
}) => {
  const [synonyms, antonyms, phrases, meanings, partsOfSpeech] = [
    [],
    [],
    [],
    [],
    [],
  ];
  for (const prop of Object.keys(response)) {
    switch (response[prop].constructor.name) {
      case "Synonym":
        synonyms.push({
          id: response[prop].dataValues.id,
          synonym: response[prop].dataValues.synonym,
        });
        break;
      case "Antonym":
        antonyms.push({
          id: response[prop].dataValues.id,
          antonym: response[prop].dataValues.antonym,
        });
        break;
      case "Meaning":
        meanings.push({
          id: response[prop].dataValues.id,
          meaning: response[prop].dataValues.meaning,
        });
        break;
      case "Phrase":
        phrases.push({
          id: response[prop].dataValues.id,
          phrase: response[prop].dataValues.phrase,
        });
        break;
    }
  }
  return {
    id: response.id,
    word: response.word,
    fileUrl: response.fileUrl,
    partsOfSpeech: response.partsOfSpeech,
    synonyms,
    antonyms,
    phrases,
    meanings,
  };
};
const postWord = async (wordFullInfo: PostWord) => {
  return executeTransaction(wordFullInfo)
    .then((response) => {
      return toObject(response);
    })
    .catch((err) => {
      return null;
    });
};

const putWord = async (wordFullInfo: PutWord) => {
  const id = wordFullInfo.id;

  try {
    console.log(id);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { getWords, postWord, putWord };
