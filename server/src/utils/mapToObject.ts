import { ExistingWord } from "../types/Word";

export function mapToWords(dtos: any[]): ExistingWord[] {
  const words = [];
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
    const partOfSpeech = dto.dataValues.PartOfSpeeches.map(
      (m: { dataValues: { part: string; id: string } }) => ({
        value: m.dataValues.part,
        id: m.dataValues.id,
      })
    );
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
