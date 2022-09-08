import { Quiz } from "use-your-words-common";
import db from "../models";
import { mapToQuizzes } from "../utils/mapToObject";
import { executeTransaction } from "./quizApi.transaction";

const toObject = (response) => {
  const { id, name, challenges } = response;
  const challengedObj = [];
  for (const challenge of challenges) {
    const {
      dataValues: { id, type, wordId, answer, question, options },
    } = challenge;
    challengedObj.push({ id, type, wordId, answer, question, options });
  }
  return {
    id,
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
  return executeTransaction(quiz)
    .then((response) => {
      return toObject(response);
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export { postQuizQuestions, fetchQuizQuestions };
