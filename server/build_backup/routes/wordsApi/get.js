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
exports.getWordsApiRouter = void 0;
const express_1 = __importDefault(require("express"));
const wordsApi_controller_1 = __importDefault(require("../../controllers/wordsApi.controller"));
const router = express_1.default.Router();
exports.getWordsApiRouter = router;
router.get("/api/wordsApi", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { word } = req.query;
    try {
        const wordInfo = yield (0, wordsApi_controller_1.default)(word);
        res.status(200).send({ wordInfo });
    }
    catch (error) {
        res.send(500);
    }
}));
//# sourceMappingURL=get.js.map