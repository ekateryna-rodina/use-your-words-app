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
exports.executeTransaction = void 0;
const sequelize_1 = require("sequelize");
const apiError_1 = __importDefault(require("../error/apiError"));
const models_1 = __importDefault(require("../models"));
function executeTransaction({ wordInfo, partOfSpeech, phrases, antonyms, synonyms, meanings, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return models_1.default.sequelize
            .transaction((t) => __awaiter(this, void 0, void 0, function* () {
            return models_1.default.Word.create(wordInfo, { transaction: t }).then((word) => __awaiter(this, void 0, void 0, function* () {
                const promises = [];
                const wordId = word.dataValues.id;
                synonyms.forEach((synonym) => {
                    const newSynonym = { synonym, wordId };
                    const promise = models_1.default.Synonym.create(newSynonym, {
                        transaction: t,
                    });
                    promises.push(promise);
                });
                antonyms.forEach((antonym) => {
                    const newAntonym = { antonym, wordId };
                    const promise = models_1.default.Antonym.create(newAntonym, {
                        transaction: t,
                    });
                    promises.push(promise);
                });
                meanings.forEach((meaning) => {
                    const newMeaning = { meaning, wordId };
                    const promise = models_1.default.Meaning.create(newMeaning, {
                        transaction: t,
                    });
                    promises.push(promise);
                });
                phrases.forEach((phrase) => {
                    const newPhrase = { phrase, wordId };
                    const promise = models_1.default.Phrase.create(newPhrase, {
                        transaction: t,
                    });
                    promises.push(promise);
                });
                const partsResult = [];
                models_1.default.PartOfSpeech.findAll({
                    where: {
                        part: {
                            [sequelize_1.Op.in]: partOfSpeech,
                        },
                    },
                }).then((parts) => {
                    parts.forEach((part) => {
                        const PartOfSpeechId = part.dataValues.id;
                        const promise = models_1.default.WordPartOfSpeech.create({ PartOfSpeechId, WordId: wordId }, { transaction: t });
                        promises.push(promise);
                        partsResult.push({
                            id: part.dataValues.id,
                            part: part.dataValues.part,
                        });
                    });
                });
                const all = yield Promise.all(promises);
                return Object.assign({ id: wordId, word: wordInfo.word, fileUrl: wordInfo.fileUrl, partsOfSpeech: partsResult }, all);
            }));
        }))
            .catch((err) => {
            if (err.name === "SequelizeUniqueConstraintError")
                apiError_1.default.WordAlreadyExists(err.message);
            throw new apiError_1.default(500, "Server error");
        });
    });
}
exports.executeTransaction = executeTransaction;
//# sourceMappingURL=wordsApi.transaction.js.map