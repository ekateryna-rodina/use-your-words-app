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
exports.getQuestionsRouter = void 0;
const express_1 = __importDefault(require("express"));
const use_your_words_common_1 = require("use-your-words-common");
const questions_controller_1 = require("../../controllers/questions.controller");
const validate_1 = __importDefault(require("../../middleware/validate"));
const questions_1 = require("../../schema/questions");
const questions_service_1 = require("../../services/questions.service");
const router = express_1.default.Router();
exports.getQuestionsRouter = router;
router.get("/api/challenges", (0, validate_1.default)(questions_1.validateGetQuestionsInput), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const wordIds = req.query.wordIds.split(",");
    const { challenges } = yield (0, questions_controller_1.generateChallengesByWorddIds)(wordIds);
    res.status(200).json({ challenges });
}));
router.get("/api/challenge", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { wordId, quizWordIds, questionType, word } = req.query;
    const challenge = yield (0, questions_service_1.generateQuestion)(wordId, quizWordIds.split(","), use_your_words_common_1.QuestionType[use_your_words_common_1.QuestionType[questionType]]);
    challenge.word = word;
    res.status(200).json(challenge);
}));
//# sourceMappingURL=get.js.map