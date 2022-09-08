import { Quiz } from "use-your-words-common";
import db from "../models";
import { mapToQuizzes } from "../utils/mapToObject";
import {
  executeDeleteTransaction,
  executePostTransaction,
} from "./quizApi.transaction";

const toObject = (response) => {
  const { id: quizId, name, challenges } = response;
  const challengedObj = [];
  for (const challenge of challenges) {
    const {
      dataValues: { id, type, wordId, answer, question, options },
    } = challenge;
    challengedObj.push({ id, type, wordId, answer, question, options });
  }
  return {
    id: quizId,
    name,
    challenges: challengedObj,
  };
};
const fetchQuizQuestions = async () => {
  try {
    const quizDtos = await db.Quiz.findAll({
      include: [{ model: db.Question }],
      nest: true,
    });
    const quizzes = mapToQuizzes(quizDtos);
    return quizzes;
  } catch (error) {
    console.log(error);
  }
};

const postQuizQuestions = async (quiz: Quiz) => {
  if (!quiz.name || !quiz.challenges.length) return null;
  return executePostTransaction(quiz)
    .then((response) => {
      return toObject(response);
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

const deleteQuiz = async (id: string) => {
  // try {
  //   // get all challenges by quiz id
  //   const challengeDtos = await db.QuizQuestion.findAll(
  //     { attributes: ["QuestionId"] },
  //     { where: { QuizId: id } }
  //   );
  //   const challengesIds = challengeDtos.map(
  //     (c: any) => c.dataValues.QuestionId
  //   );
  //   // delete quiz
  //   await db.Quiz.destroy({ where: { id } });
  //   deleteQuestions(challengesIds);
  // } catch (error) {
  //   console.log(error.message);
  //   throw new ApiError(500, error.message);
  // }

  return executeDeleteTransaction(id).catch((err) => {
    console.log(err);
    return null;
  });
};

export { postQuizQuestions, fetchQuizQuestions, deleteQuiz };
