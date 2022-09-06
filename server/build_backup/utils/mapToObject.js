"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToQuizzes = exports.mapToWords = void 0;
function mapToWords(dtos) {
    const words = [];
    let partOfSpeech = [];
    for (const dto of dtos) {
        const { id, word, fileUrl, createdAt, updatedAt } = dto.dataValues;
        const meanings = dto.dataValues.Meanings.map((m) => ({
            value: m.dataValues.meaning,
            id: m.dataValues.id,
        }));
        const phrases = dto.dataValues.Phrases.map((m) => ({
            value: m.dataValues.phrase,
            id: m.dataValues.id,
        }));
        const synonyms = dto.dataValues.Synonyms.map((m) => ({
            value: m.dataValues.synonym,
            id: m.dataValues.id,
        }));
        const antonyms = dto.dataValues.Antonyms.map((m) => ({
            value: m.dataValues.antonym,
            id: m.dataValues.id,
        }));
        if (dto.dataValues.PartOfSpeeches) {
            partOfSpeech = dto.dataValues.PartOfSpeeches.map((m) => ({
                value: m.dataValues.part,
                id: m.dataValues.id,
            }));
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
    return words;
}
exports.mapToWords = mapToWords;
function mapToQuizzes(dtos) {
    if (!dtos || !dtos.length)
        return [];
    const quizzes = [];
    for (const dto of dtos) {
        const challenges = [];
        dto.dataValues.Questions.forEach((question) => {
            const parsedQuestion = Object.keys(question.dataValues).reduce((acc, curr) => {
                if (curr === "type") {
                    acc.__type = question.dataValues[curr];
                    return acc;
                }
                try {
                    const value = JSON.parse(question.dataValues[curr]);
                    acc[curr] = value;
                    return acc;
                }
                catch (error) {
                    acc[curr] = question.dataValues[curr];
                    return acc;
                }
            }, {});
            challenges.push(parsedQuestion);
        });
        const quiz = {
            id: dto.id,
            name: dto.name,
            challenges,
        };
        quizzes.push(quiz);
    }
    return quizzes;
}
exports.mapToQuizzes = mapToQuizzes;
//# sourceMappingURL=mapToObject.js.map