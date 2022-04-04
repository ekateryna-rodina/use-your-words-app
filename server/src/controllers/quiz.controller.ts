import {
  fetchQuizQuestions,
  postQuizQuestions,
} from "../services/quiz.service";
import { Quiz } from "../types/Question";

export async function saveQuizQuestions(data: Quiz) {
  try {
    const quizQuestions = await postQuizQuestions(data);
    return quizQuestions;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getQuizQuestions() {
  try {
    const quizQuestions = await fetchQuizQuestions();
    return quizQuestions;
  } catch (error) {
    throw new Error(error);
  }
}
