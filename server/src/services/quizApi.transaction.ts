import { BaseQuestion, QuestionType } from "use-your-words-common";
import ApiError from "../error/apiError";
import db from "../models";
import { stringify } from "../utils/strings";

export async function executeTransaction({ name, challenges }) {
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
          return {
            id: QUIZ_ID,
            name: name,
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
