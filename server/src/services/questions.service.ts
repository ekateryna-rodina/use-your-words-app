import { Op } from "sequelize";
import { BaseQuestion, QuestionType } from "use-your-words-common";
import ApiError from "../error/apiError";
import db from "../models";
import { ExistingWord } from "../types/Word";
import { mapToWords } from "../utils/mapToObject";
import QuestionsFactory from "./questionsFactory";

const generateQuizChallenges = async (wordIds: string[]) => {
  console.log("wordIds", wordIds);
  if (!wordIds) return;
  const challenges: (BaseQuestion & { __type: QuestionType })[] = [];
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
    console.log(items, "items");
    for (const item of items) {
      for (const qt of Object.keys(QuestionType)) {
        const questionType: QuestionType =
          QuestionType[qt as keyof typeof QuestionType];
        const newChallenge = QuestionsFactory(
          questionType,
          item as ExistingWord,
          items.filter((w: ExistingWord) => w.word !== item.word)
        );
        if (!newChallenge) continue;
        challenges.push(newChallenge);
      }
    }

    return { challenges };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const generateQuestion = async (
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

export { generateQuizChallenges as generateQuizQuestions, generateQuestion };
