import { generateQuizQuestions } from "../services/questions.service";

export async function generateQuestions(wordIds: string[]) {
  try {
    const words = await generateQuizQuestions(wordIds);
    return words;
  } catch (error) {
    throw new Error(error);
  }
}
