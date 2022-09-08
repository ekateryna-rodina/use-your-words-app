import { Op } from "@sequelize/core";
import ApiError from "../error/apiError";
import db from "../models";
import { WordData } from "../types/Word";
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
type PutWord = {
  id: string;
  synonyms: WordData[];
  antonyms: WordData[];
  phrases: WordData[];
  meanings: WordData[];
};
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
  const { id, synonyms, antonyms, meanings, phrases } = wordFullInfo;
  try {
    // deletion for synonyms, antonyms, meanings, phrases
    if (antonyms) {
      await db.Antonym.destroy({
        where: {
          [Op.and]: [
            { wordId: id },
            {
              id: {
                [Op.notIn]: antonyms.map((a) => a.id),
              },
            },
          ],
        },
      });
      const newAntonyms = antonyms.map((a) => ({
        id: a.id,
        antonym: a.value,
        wordId: id,
      }));
      await db.Antonym.bulkCreate(newAntonyms, {
        updateOnDuplicate: ["antonym"],
      });
    }
    if (synonyms) {
      await db.Synonym.destroy({
        where: {
          [Op.and]: [
            { wordId: id },
            {
              id: {
                [Op.notIn]: synonyms.map((a) => a.id),
              },
            },
          ],
        },
      });
      const newSynonyms = synonyms.map((s) => ({
        id: s.id,
        synonym: s.value,
        wordId: id,
      }));
      await db.Synonym.bulkCreate(newSynonyms, {
        updateOnDuplicate: ["synonym"],
      });
    }
    if (meanings) {
      await db.Meaning.destroy({
        where: {
          [Op.and]: [
            { wordId: id },
            {
              id: {
                [Op.notIn]: meanings.map((a) => a.id),
              },
            },
          ],
        },
      });
      const newMeanings = meanings.map((s) => ({
        id: s.id,
        meaning: s.value,
        wordId: id,
      }));
      await db.Meaning.bulkCreate(newMeanings, {
        updateOnDuplicate: ["meaning"],
      });
    }
    if (phrases) {
      await db.Phrase.destroy({
        where: {
          [Op.and]: [
            { wordId: id },
            {
              id: {
                [Op.notIn]: phrases.map((a) => a.id),
              },
            },
          ],
        },
      });
      const newPhrases = phrases.map((s) => ({
        id: s.id,
        phrase: s.value,
        wordId: id,
      }));
      await db.Phrase.bulkCreate(newPhrases, {
        updateOnDuplicate: ["phrase"],
      });
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const deleteWord = async (id: string) => {
  try {
    // add constraint?
    // destroy question and quiz-question record first
    await db.Word.destroy({ where: { id } });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const getPartsOfSpeech = async () => {
  try {
    const response = await db.PartOfSpeech.findAll({});
    const parts = response.map(
      (p: { dataValues: { id: string; part: string } }) => ({
        id: p.dataValues.id,
        value: p.dataValues.part,
      })
    );
    return parts;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { getWords, postWord, putWord, deleteWord, getPartsOfSpeech };
