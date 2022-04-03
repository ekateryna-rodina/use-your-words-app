import {
  generateQuestion,
  generateQuizQuestions,
  postQuizQuestions,
} from "../services/questions.service";
import { QuestionType, Quiz } from "../types/Question";

export async function generateQuestions(wordIds: string[]) {
  try {
    const quiz = await generateQuizQuestions(wordIds);
    return quiz;
  } catch (error) {
    throw new Error(error);
  }
}

export async function generateQuizQuestion(
  wordId: string,
  quizWordIds: string[],
  questionType: QuestionType
) {
  try {
    const question = await generateQuestion(wordId, quizWordIds, questionType);
    return question;
  } catch (error) {
    throw new Error(error);
  }
}

export async function saveQuizQuestions(data: Quiz) {
  try {
    const quizQuestions = await postQuizQuestions(data);
    return quizQuestions;
  } catch (error) {
    throw new Error(error);
  }
}
