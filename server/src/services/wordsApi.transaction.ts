import { Op } from "sequelize";
import ApiError from "../error/apiError";
import db from "../models";

export async function executeTransaction({
  wordInfo,
  partOfSpeech,
  phrases,
  antonyms,
  synonyms,
  meanings,
}) {
  return db.sequelize
    .transaction(async (t: any) => {
      return db.Word.create(wordInfo, { transaction: t }).then(
        async (word: { dataValues: { id: string } }) => {
          const promises = [];
          const wordId = word.dataValues.id;
          // synonyms
          synonyms.forEach((synonym: string) => {
            const newSynonym = { synonym, wordId };
            const promise = db.Synonym.create(newSynonym, {
              transaction: t,
            });
            promises.push(promise);
          });
          // antonyms
          antonyms.forEach((antonym: string) => {
            const newAntonym = { antonym, wordId };
            const promise = db.Antonym.create(newAntonym, {
              transaction: t,
            });
            promises.push(promise);
          });
          // meanings
          meanings.forEach((meaning: string) => {
            const newMeaning = { meaning, wordId };
            const promise = db.Meaning.create(newMeaning, {
              transaction: t,
            });
            promises.push(promise);
          });
          // phrases
          phrases.forEach((phrase: string) => {
            const newPhrase = { phrase, wordId };
            const promise = db.Phrase.create(newPhrase, {
              transaction: t,
            });
            promises.push(promise);
          });

          const partsResult = [];
          db.PartOfSpeech.findAll({
            where: {
              part: {
                [Op.in]: partOfSpeech,
              },
            },
          }).then((parts: { dataValues: { id: string; part: string } }[]) => {
            parts.forEach((part) => {
              const PartOfSpeechId = part.dataValues.id;
              const promise = db.WordPartOfSpeech.create(
                { PartOfSpeechId, WordId: wordId },
                { transaction: t }
              );
              promises.push(promise);
              partsResult.push({
                id: part.dataValues.id,
                part: part.dataValues.part,
              });
            });
          });

          const all = await Promise.all(promises);

          return {
            id: wordId,
            word: wordInfo.word,
            fileUrl: wordInfo.fileUrl,
            partsOfSpeech: partsResult,
            ...all,
          };
        }
      );
    })
    .catch((err: any) => {
      if (err.name === "SequelizeUniqueConstraintError")
        ApiError.WordAlreadyExists(err.message);
      throw new ApiError(500, "Server error");
    });
}
