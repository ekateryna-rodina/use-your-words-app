import ApiError from "../error/apiError";
import db from "../models";
import { QuestionType } from "../types/Question";
import { ExistingWord } from "../types/Word";
import QuestionsFactory from "./questionsFactory";

const generateQuizQuestions = async (wordIds: string[]) => {
  let quizQuestions = [];
  const questionTypes = Object.keys(QuestionType).filter(
    (key) => !isNaN(+QuestionType[key])
  );
  try {
    const items = await db.Word.findAll({ where: { id: { $in: wordIds } } });
    for (let item of items) {
      for (let qt of questionTypes) {
        var questionType: QuestionType =
          QuestionType[qt as keyof typeof QuestionType];
        const newQuestion = QuestionsFactory(
          questionType,
          item as ExistingWord,
          items.filter((w: ExistingWord) => w.word !== item.word)
        );
        quizQuestions.push(newQuestion);
      }
    }
    return quizQuestions;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { generateQuizQuestions };
