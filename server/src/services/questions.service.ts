import { Op } from "sequelize";
import ApiError from "../error/apiError";
import db from "../models";
import { QuestionType } from "../types/Question";
import { ExistingWord } from "../types/Word";
import { mapToWords } from "../utils/mapToObject";
import QuestionsFactory from "./questionsFactory";

const generateQuizQuestions = async (wordIds: string[]) => {
  if (!wordIds) return;
  const quizQuestions = [];
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
        quizQuestions.push(newQuestion);
      }
    }
    return quizQuestions;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { generateQuizQuestions };
