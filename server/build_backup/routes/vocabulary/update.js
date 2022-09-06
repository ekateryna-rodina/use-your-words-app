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
exports.putWordsRouter = void 0;
const express_1 = __importDefault(require("express"));
const words_controller_1 = require("../../controllers/words.controller");
const validate_1 = __importDefault(require("../../middleware/validate"));
const word_1 = require("../../schema/word");
const router = express_1.default.Router();
exports.putWordsRouter = router;
router.put("/api/words/:wordId", (0, validate_1.default)(word_1.validateEditWord), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wordInfo = yield (0, words_controller_1.updateWord)(req.body);
        res.status(200).json({ wordInfo });
    }
    catch (error) {
        console.log(error);
    }
}));
//# sourceMappingURL=update.js.map