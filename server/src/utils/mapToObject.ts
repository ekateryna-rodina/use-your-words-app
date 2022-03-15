import { ExistingWord } from "../types/Word";

export function mapToWords(dtos: any[]): ExistingWord[] {
  const words = [];
  for (const dto of dtos) {
    const { id, word, fileUrl, createdAt, updatedAt } = dto.dataValues;
    const meanings = dto.dataValues.Meanings.map(
      (m: { dataValues: { meaning: string } }) => m.dataValues.meaning
    ).join("|");
    const phrases = dto.dataValues.Phrases.map(
      (m: { dataValues: { phrase: string } }) => m.dataValues.phrase
    ).join("|");
    const synonyms = dto.dataValues.Synonyms.map(
      (m: { dataValues: { synonym: string } }) => m.dataValues.synonym
    ).join("|");
    const antonyms = dto.dataValues.Antonyms.map(
      (m: { dataValues: { antonym: string } }) => m.dataValues.antonym
    ).join("|");
    const partOfSpeech = dto.dataValues.PartOfSpeeches.map(
      (m: { dataValues: { part: string } }) => m.dataValues.part
    ).join("|");
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
