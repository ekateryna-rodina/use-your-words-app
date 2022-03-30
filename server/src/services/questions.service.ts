import ApiError from "../error/apiError";
import db from "../models";

const generateQuizQuestions = async (wordIds: string[]) => {
  let quizQuestions = [];
  try {
    const words = await db.Word.findAll({ where: { id: { $in: wordIds } } });
    words.forEach((word) => {});
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { generateQuizQuestions };
