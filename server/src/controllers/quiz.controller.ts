import { Quiz } from "use-your-words-common";
import {
  fetchQuizQuestions,
  postQuizQuestions,
} from "../services/quiz.service";

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
