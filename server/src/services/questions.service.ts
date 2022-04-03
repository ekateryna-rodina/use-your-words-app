import { Op } from "sequelize";
import ApiError from "../error/apiError";
import db from "../models";
import { BaseQuestion, QuestionType, Quiz } from "../types/Question";
import { ExistingWord } from "../types/Word";
import { mapToWords } from "../utils/mapToObject";
import QuestionsFactory from "./questionsFactory";

const generateQuizQuestions = async (wordIds: string[]) => {
  if (!wordIds) return;
  const questions: (BaseQuestion & { __type: QuestionType })[] = [];
  const quizInfo = {
    name: "New number",
  };
  try {
    const itemDtos = await db.Word.findAll({
      where: {
        id: {
          [Op.in]: wordIds,
        },
      },
      include: [
        { model: db.Phrase, separate: true },
        { model: db.Meaning, separate: true },
        { model: db.Synonym, separate: true },
        { model: db.Antonym, separate: true },
      ],
    });

    const items = mapToWords(itemDtos);
    for (const item of items) {
      for (const qt of Object.keys(QuestionType)) {
        const questionType: QuestionType =
          QuestionType[qt as keyof typeof QuestionType];
        const newQuestion = QuestionsFactory(
          questionType,
          item as ExistingWord,
          items.filter((w: ExistingWord) => w.word !== item.word)
        );
        if (!newQuestion) continue;
        questions.push(newQuestion);
      }
    }

    return { ...quizInfo, questions };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export const generateQuestion = async (
  wordId: string,
  quizWordIds: string[],
  questionType: QuestionType
) => {
  if (!wordId || !questionType) return null;
  try {
    const itemDtos = await db.Word.findAll({
      where: {
        id: {
          [Op.in]: [wordId, ...quizWordIds],
        },
      },
      include: [
        { model: db.Phrase, separate: true },
        { model: db.Meaning, separate: true },
        { model: db.Synonym, separate: true },
        { model: db.Antonym, separate: true },
      ],
    });

    const items = mapToWords(itemDtos);
    const newQuestion = QuestionsFactory(
      questionType,
      items.filter((i) => i.id === wordId)[0] as ExistingWord,
      items.filter((w: ExistingWord) => w.id !== wordId)
    );
    return newQuestion;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export const postQuizQuestions = (quiz: Quiz) => {
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

export { generateQuizQuestions };
