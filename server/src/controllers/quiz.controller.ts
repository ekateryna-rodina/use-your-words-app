import { postQuizQuestions } from "../services/quiz.service";
import { Quiz } from "../types/Question";

export async function saveQuizQuestions(data: Quiz) {
  try {
    const quizQuestions = await postQuizQuestions(data);
    return quizQuestions;
  } catch (error) {
    throw new Error(error);
  }
}
