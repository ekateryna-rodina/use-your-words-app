import { QuestionType } from "use-your-words-common";
import { BaseQuestion, Quiz } from "../types/Question";
import { ExistingWord } from "../types/Word";

export function mapToWords(dtos: any[]): ExistingWord[] {
  const words = [];
  let partOfSpeech = [];
  for (const dto of dtos) {
    const { id, word, fileUrl, createdAt, updatedAt } = dto.dataValues;
    const meanings = dto.dataValues.Meanings.map(
      (m: { dataValues: { meaning: string; id: string } }) => ({
        value: m.dataValues.meaning,
        id: m.dataValues.id,
      })
    );

    const phrases = dto.dataValues.Phrases.map(
      (m: { dataValues: { phrase: string; id: string } }) => ({
        value: m.dataValues.phrase,
        id: m.dataValues.id,
      })
    );

    const synonyms = dto.dataValues.Synonyms.map(
      (m: { dataValues: { synonym: string; id: string } }) => ({
        value: m.dataValues.synonym,
        id: m.dataValues.id,
      })
    );

    const antonyms = dto.dataValues.Antonyms.map(
      (m: { dataValues: { antonym: string; id: string } }) => ({
        value: m.dataValues.antonym,
        id: m.dataValues.id,
      })
    );
    if (dto.dataValues.PartOfSpeeches) {
      partOfSpeech = dto.dataValues.PartOfSpeeches.map(
        (m: { dataValues: { part: string; id: string } }) => ({
          value: m.dataValues.part,
          id: m.dataValues.id,
        })
      );
    }

    const result = {
      id,
      word,
      fileUrl,
      createdAt,
      updatedAt,
      meanings,
      phrases,
      synonyms,
      antonyms,
      partOfSpeech,
    };
    words.push(result);
  }
  return words as ExistingWord[];
}

export function mapToQuizzes(dtos: any[]) {
  if (!dtos || !dtos.length) return [];
  const quizzes: Quiz[] = [];
  for (let dto of dtos) {
    const questions: (BaseQuestion & { __type: QuestionType })[] = [];
    dto.dataValues.Questions.forEach((question: { dataValues: any }) => {
      const parsedQuestion = Object.keys(question.dataValues).reduce<
        BaseQuestion & { __type: QuestionType }
      >((acc, curr: string) => {
        if (curr === "type") {
          acc["__type"] = question.dataValues[curr];
          return acc;
        }
        // try to parse to object or array
        try {
          let value = JSON.parse(question.dataValues[curr]);
          acc[curr] = value;
          return acc;
        } catch (error) {
          acc[curr] = question.dataValues[curr];
          return acc;
        }
      }, {} as BaseQuestion & { __type: QuestionType });

      questions.push(parsedQuestion);
    });

    const quiz: Quiz = {
      id: dto.id,
      name: dto.name,
      questions,
    };
    quizzes.push(quiz);
  }

  return quizzes;
}
