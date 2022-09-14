import { Quiz } from "use-your-words-common";
import { fetchQuizQuestions, postQuiz } from "../services/quiz.service";

export async function saveQuiz(data: Quiz) {
  try {
    const quizQuestions = await postQuiz(data);
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
