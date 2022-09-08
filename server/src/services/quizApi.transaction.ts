import { Op } from "sequelize";
import { BaseQuestion, QuestionType } from "use-your-words-common";
import ApiError from "../error/apiError";
import db from "../models";
import { stringify } from "../utils/strings";
import { deleteQuestions } from "./questions.service";

export async function executePostTransaction({ name, challenges }) {
  return db.sequelize
    .transaction(async (t: any) => {
      // create quiz first
      return db.Quiz.create({ name }, { transaction: t }).then(
        async (quiz: { dataValues: { id: string } }) => {
          const challengePromises = [];
          const quizChallengePromises = [];
          const QUIZ_ID = quiz.dataValues.id;
          // create challenges
          challenges.forEach(
            (challenge: BaseQuestion & { __type: QuestionType }) => {
              const stred = stringify(challenge);
              const promise = db.Question.create(stred, {
                transaction: t,
              });
              challengePromises.push(promise);
            }
          );

          const all = await Promise.all(challengePromises);

          //   connect challenges with quiz
          all
            .map((p) => p.dataValues.id)
            .forEach((id) => {
              const promise = db.QuizQuestion.create(
                { QuizId: QUIZ_ID, QuestionId: id },
                {
                  transaction: t,
                }
              );
              quizChallengePromises.push(promise);
            });
          await Promise.all(quizChallengePromises);
          // set words frozen, so they cannot be edited or deleted after inclusion in quizzes
          const wordsToFreeze = Array.from(
            new Set(challenges.map((c: any) => c.wordId))
          ) as string[];

          await db.Word.update(
            { isFreeze: true },
            { where: { id: { [Op.in]: wordsToFreeze } } },
            { transaction: t }
          );
          return {
            id: QUIZ_ID,
            name,
            challenges: all,
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

export async function executeDeleteTransaction(id: string) {
  return db.sequelize
    .transaction(async (t: any) => {
      // get all challenges by quiz id
      const challengeDtos = await db.QuizQuestion.findAll(
        { attributes: ["QuestionId"] },
        { where: { QuizId: id } }
      );
      const challengesIds = challengeDtos.map(
        (c: any) => c.dataValues.QuestionId
      );

      // create quiz first
      return db.Quiz.destroy({ where: { id } }, { transaction: t }).then(
        async () => {
          deleteQuestions(challengesIds);
          // select all challenges which are included into quizzes and pick WORD_IDS
          const allQuizChallengesDtos = await db.QuizQuestion.findAll({
            attributes: ["QuestionId"],
          });
          const allQuizChallengeIds = allQuizChallengesDtos.map(
            (q) => q.dataValues.QuestionId
          );
          const challengeDtos = await db.Question.findAll(
            { attributes: ["wordId"] },
            { where: { id: { [Op.in]: allQuizChallengeIds } } }
          );
          const wordIds = Array.from(
            new Set(challengeDtos.map((c) => c.dataValues.wordId))
          ) as [];
          console.log("hhh", wordIds);
          // select all word ids which are not WORD_IDS and have freeze true, update freeze to false
          await db.Word.update(
            { isFreeze: false },
            { where: { id: { [Op.in]: wordIds } } },
            { transaction: t }
          );
        }
      );
    })
    .catch((err: any) => {
      if (err.name === "SequelizeUniqueConstraintError")
        ApiError.WordAlreadyExists(err.message);
      throw new ApiError(500, "Server error");
    });
}
