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
exports.postQuizRouter = void 0;
const express_1 = __importDefault(require("express"));
const quiz_controller_1 = require("../../controllers/quiz.controller");
const router = express_1.default.Router();
exports.postQuizRouter = router;
router.post("/api/quiz", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const quiz = yield (0, quiz_controller_1.saveQuizQuestions)(data);
        res.status(200).json(quiz);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
//# sourceMappingURL=post.js.map