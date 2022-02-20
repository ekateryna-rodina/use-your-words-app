import { Op } from "sequelize";
import ApiError from "../error/apiError";
import db from "../models";

const getWords = async () => {
  try {
    return [];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const postWord = async ({
  wordInfo,
  partOfSpeech,
  phrases,
  antonyms,
  synonyms,
  meanings,
}) => {
  try {
    console.log(synonyms);
    return db.sequelize
      .transaction((t) => {
        return db.Word.create(wordInfo, { transaction: t }).then((word) => {
          const promises = [];
          const wordId = word.dataValues["id"];
          // synonyms
          synonyms.forEach((synonym) => {
            const newSynonym = { synonym, wordId };
            const promise = db.Synonym.create(newSynonym, {
              transaction: t,
            });
            promises.push(promise);
          });
          // antonyms
          antonyms.forEach((antonym) => {
            const newAntonym = { antonym, wordId };
            const promise = db.Antonym.create(newAntonym, {
              transaction: t,
            });
            promises.push(promise);
          });
          // meanings
          meanings.forEach((meaning) => {
            const newMeaning = { meaning, wordId };
            const promise = db.Meaning.create(newMeaning, {
              transaction: t,
            });
            promises.push(promise);
          });
          // phrases
          phrases.forEach((phrase) => {
            const newPhrase = { phrase, wordId };
            const promise = db.Phrase.create(newPhrase, {
              transaction: t,
            });
            promises.push(promise);
          });

          db.PartOfSpeech.findAll({
            where: {
              part: {
                [Op.in]: partOfSpeech,
              },
            },
          }).then((parts: { dataValues: { id: string } }[]) => {
            parts.forEach((part) => {
              const PartOfSpeechId = part.dataValues["id"];
              const promise = db.WordPartOfSpeech.create(
                { PartOfSpeechId, WordId: wordId },
                { transaction: t }
              );
              promises.push(promise);
            });
          });

          return Promise.all(promises);
        });
      })
      .then(function (result) {
        console.log(result);
      })
      .catch(function (err) {
        console.log(err);
        throw err;
      });
  } catch (error) {
    return new ApiError(error.code, error.message);
  }
};

export { getWords, postWord };
