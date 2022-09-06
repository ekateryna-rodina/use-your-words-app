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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuizQuestion = exports.generateChallengesByWorddIds = void 0;
const questions_service_1 = require("../services/questions.service");
function generateChallengesByWorddIds(wordIds) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const quiz = yield (0, questions_service_1.generateQuizQuestions)(wordIds);
            return quiz;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.generateChallengesByWorddIds = generateChallengesByWorddIds;
function generateQuizQuestion(wordId, quizWordIds, questionType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const question = yield (0, questions_service_1.generateQuestion)(wordId, quizWordIds, questionType);
            return question;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.generateQuizQuestion = generateQuizQuestion;
//# sourceMappingURL=questions.controller.js.map