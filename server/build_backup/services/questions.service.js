"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuestion = exports.generateQuizQuestions = void 0;
const sequelize_1 = require("sequelize");
const use_your_words_common_1 = require("use-your-words-common");
const apiError_1 = __importDefault(require("../error/apiError"));
const models_1 = __importDefault(require("../models"));
const mapToObject_1 = require("../utils/mapToObject");
const questionsFactory_1 = __importDefault(require("./questionsFactory"));
const generateQuizChallenges = (wordIds) => __awaiter(void 0, void 0, void 0, function* () {
    if (!wordIds)
        return;
    const challenges = [];
    try {
        const itemDtos = yield models_1.default.Word.findAll({
            where: {
                id: {
                    [sequelize_1.Op.in]: wordIds,
                },
            },
            include: [
                { model: models_1.default.Phrase, separate: true },
                { model: models_1.default.Meaning, separate: true },
                { model: models_1.default.Synonym, separate: true },
                { model: models_1.default.Antonym, separate: true },
            ],
        });
        const items = (0, mapToObject_1.mapToWords)(itemDtos);
        for (const item of items) {
            for (const qt of Object.keys(use_your_words_common_1.QuestionType)) {
                const questionType = use_your_words_common_1.QuestionType[qt];
                const newChallenge = (0, questionsFactory_1.default)(questionType, item, items.filter((w) => w.word !== item.word));
                if (!newChallenge)
                    continue;
                challenges.push(newChallenge);
            }
        }
        return { challenges };
    }
    catch (error) {
        throw new apiError_1.default(500, error.message);
    }
});
exports.generateQuizQuestions = generateQuizChallenges;
const generateQuestion = (wordId, quizWordIds, questionType) => __awaiter(void 0, void 0, void 0, function* () {
    if (!wordId || typeof questionType === "undefined")
        return null;
    try {
        const itemDtos = yield models_1.default.Word.findAll({
            where: {
                id: {
                    [sequelize_1.Op.in]: [wordId, ...quizWordIds],
                },
            },
            include: [
                { model: models_1.default.Phrase, separate: true },
                { model: models_1.default.Meaning, separate: true },
                { model: models_1.default.Synonym, separate: true },
                { model: models_1.default.Antonym, separate: true },
            ],
        });
        const items = (0, mapToObject_1.mapToWords)(itemDtos);
        const newQuestion = (0, questionsFactory_1.default)(questionType, items.filter((i) => i.id === wordId)[0], items.filter((w) => w.id !== wordId));
        return newQuestion;
    }
    catch (error) {
        throw new apiError_1.default(500, error.message);
    }
});
exports.generateQuestion = generateQuestion;
//# sourceMappingURL=questions.service.js.map