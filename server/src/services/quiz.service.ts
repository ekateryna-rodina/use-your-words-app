import { QuestionType } from "use-your-words-common";
import db from "../models";
import { Quiz } from "../types/Question";
import { mapToQuizzes } from "../utils/mapToObject";

const fetchQuizQuestions = async () => {
  try {
    const quizDtos = await db.Quiz.findAll({
      include: [{ model: db.Question }],
    });
    const quizzes = mapToQuizzes(quizDtos);
    return quizzes;
  } catch (error) {}
};

const postQuizQuestions = async (quiz: Quiz) => {
  if (!quiz.name || !quiz.questions.length) return null;
  let quizId;
  // save the quiz first
  return db.Quiz.create({ name: quiz.name })
    .then((response: { dataValues: { id: string; name: string } }) => {
      quizId = response.dataValues.id;

      for (const question of quiz.questions) {
        const stringified = Object.keys(question).reduce(
          (acc: Partial<Quiz & { type: string }>, curr: string) => {
            if (curr === "__type") {
              const type: string =
                QuestionType[question[curr as keyof typeof QuestionType]];
              acc.type = type;
              return acc;
            }
            acc[curr] =
              typeof question[curr] === "object" ||
              Array.isArray(question[curr])
                ? JSON.stringify(question[curr])
                : question[curr];
            return acc;
          },
          {}
        );

        db.Question.create(stringified).then((response) => {
          const QuestionId = response.dataValues.id;
          const QuizId = quizId;
          db.QuizQuestion.create({ QuestionId, QuizId });
        });
      }
      return {
        quiz: {
          id: quizId,
          name: response.dataValues.name,
        },
      };
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export { postQuizQuestions, fetchQuizQuestions };
