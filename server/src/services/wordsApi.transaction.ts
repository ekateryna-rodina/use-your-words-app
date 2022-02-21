import { Op } from "sequelize";
import db from "../models";

export function executeTransaction({
  wordInfo,
  partOfSpeech,
  phrases,
  antonyms,
  synonyms,
  meanings,
}) {
  return (
    db.sequelize
      .transaction((t: any) => {
        return db.Word.create(wordInfo, { transaction: t }).then(
          (word: { dataValues: { id: string } }) => {
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

            db.PartOfSpeech.findAll({
              where: {
                part: {
                  [Op.in]: partOfSpeech,
                },
              },
            }).then((parts: { dataValues: { id: string } }[]) => {
              parts.forEach((part) => {
                const PartOfSpeechId = part.dataValues.id;
                const promise = db.WordPartOfSpeech.create(
                  { PartOfSpeechId, WordId: wordId },
                  { transaction: t }
                );
                promises.push(promise);
              });
            });

            return Promise.all(promises);
          }
        );
      })
      // .then((res: any) => console.log(res))
      .catch((err: any) => {
        // console.log(err);
        throw err;
      })
  );
}
