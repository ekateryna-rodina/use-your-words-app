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
exports.fetchQuizQuestions = exports.postQuizQuestions = void 0;
const use_your_words_common_1 = require("use-your-words-common");
const models_1 = __importDefault(require("../models"));
const mapToObject_1 = require("../utils/mapToObject");
const fetchQuizQuestions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizDtos = yield models_1.default.Quiz.findAll({
            include: [{ model: models_1.default.Question }],
        });
        console.log("dtos", quizDtos);
        const quizzes = (0, mapToObject_1.mapToQuizzes)(quizDtos);
        return quizzes;
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchQuizQuestions = fetchQuizQuestions;
const postQuizQuestions = (quiz) => __awaiter(void 0, void 0, void 0, function* () {
    if (!quiz.name || !quiz.challenges.length)
        return null;
    let quizId;
    return models_1.default.Quiz.create({ name: quiz.name })
        .then((response) => {
        quizId = response.dataValues.id;
        for (const question of quiz.challenges) {
            const stringified = Object.keys(question).reduce((acc, curr) => {
                if (curr === "__type") {
                    const type = use_your_words_common_1.QuestionType[question[curr]];
                    acc.type = type;
                    return acc;
                }
                acc[curr] =
                    typeof question[curr] === "object" ||
                        Array.isArray(question[curr])
                        ? JSON.stringify(question[curr])
                        : question[curr];
                return acc;
            }, {});
            models_1.default.Question.create(stringified).then((r) => {
                const QuestionId = r.dataValues.id;
                const QuizId = quizId;
                models_1.default.QuizQuestion.create({ QuestionId, QuizId });
            });
        }
        return {
            quiz: {
                id: quizId,
                name: response.dataValues.name,
            },
        };
    })
        .catch((err) => {
        console.log(err);
        return null;
    });
});
exports.postQuizQuestions = postQuizQuestions;
//# sourceMappingURL=quiz.service.js.map