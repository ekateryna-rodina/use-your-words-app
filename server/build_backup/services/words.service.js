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
exports.getPartsOfSpeech = exports.deleteWord = exports.putWord = exports.postWord = exports.getWords = void 0;
const core_1 = require("@sequelize/core");
const apiError_1 = __importDefault(require("../error/apiError"));
const models_1 = __importDefault(require("../models"));
const mapToObject_1 = require("../utils/mapToObject");
const wordsApi_transaction_1 = require("./wordsApi.transaction");
const getWords = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.default.Word.findAll({
            include: [
                { model: models_1.default.Phrase, separate: true },
                { model: models_1.default.Meaning, separate: true },
                { model: models_1.default.Synonym, separate: true },
                { model: models_1.default.Antonym, separate: true },
                { model: models_1.default.PartOfSpeech, separate: false },
            ],
        });
        const words = (0, mapToObject_1.mapToWords)(result);
        return words;
    }
    catch (error) {
        return null;
    }
});
exports.getWords = getWords;
const toObject = (response) => {
    const [synonyms, antonyms, phrases, meanings, partsOfSpeech] = [
        [],
        [],
        [],
        [],
        [],
    ];
    for (const prop of Object.keys(response)) {
        switch (response[prop].constructor.name) {
            case "Synonym":
                synonyms.push({
                    id: response[prop].dataValues.id,
                    synonym: response[prop].dataValues.synonym,
                });
                break;
            case "Antonym":
                antonyms.push({
                    id: response[prop].dataValues.id,
                    antonym: response[prop].dataValues.antonym,
                });
                break;
            case "Meaning":
                meanings.push({
                    id: response[prop].dataValues.id,
                    meaning: response[prop].dataValues.meaning,
                });
                break;
            case "Phrase":
                phrases.push({
                    id: response[prop].dataValues.id,
                    phrase: response[prop].dataValues.phrase,
                });
                break;
        }
    }
    return {
        id: response.id,
        word: response.word,
        fileUrl: response.fileUrl,
        partsOfSpeech: response.partsOfSpeech,
        synonyms,
        antonyms,
        phrases,
        meanings,
    };
};
const postWord = (wordFullInfo) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, wordsApi_transaction_1.executeTransaction)(wordFullInfo)
        .then((response) => {
        return toObject(response);
    })
        .catch((err) => {
        console.log(err);
        return null;
    });
});
exports.postWord = postWord;
const putWord = (wordFullInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, synonyms, antonyms, meanings, phrases } = wordFullInfo;
    try {
        if (antonyms) {
            yield models_1.default.Antonym.destroy({
                where: {
                    [core_1.Op.and]: [
                        { wordId: id },
                        {
                            id: {
                                [core_1.Op.notIn]: antonyms.map((a) => a.id),
                            },
                        },
                    ],
                },
            });
            const newAntonyms = antonyms.map((a) => ({
                id: a.id,
                antonym: a.value,
                wordId: id,
            }));
            yield models_1.default.Antonym.bulkCreate(newAntonyms, {
                updateOnDuplicate: ["antonym"],
            });
        }
        if (synonyms) {
            yield models_1.default.Synonym.destroy({
                where: {
                    [core_1.Op.and]: [
                        { wordId: id },
                        {
                            id: {
                                [core_1.Op.notIn]: synonyms.map((a) => a.id),
                            },
                        },
                    ],
                },
            });
            const newSynonyms = synonyms.map((s) => ({
                id: s.id,
                synonym: s.value,
                wordId: id,
            }));
            yield models_1.default.Synonym.bulkCreate(newSynonyms, {
                updateOnDuplicate: ["synonym"],
            });
        }
        if (meanings) {
            yield models_1.default.Meaning.destroy({
                where: {
                    [core_1.Op.and]: [
                        { wordId: id },
                        {
                            id: {
                                [core_1.Op.notIn]: meanings.map((a) => a.id),
                            },
                        },
                    ],
                },
            });
            const newMeanings = meanings.map((s) => ({
                id: s.id,
                meaning: s.value,
                wordId: id,
            }));
            yield models_1.default.Meaning.bulkCreate(newMeanings, {
                updateOnDuplicate: ["meaning"],
            });
        }
        if (phrases) {
            yield models_1.default.Phrase.destroy({
                where: {
                    [core_1.Op.and]: [
                        { wordId: id },
                        {
                            id: {
                                [core_1.Op.notIn]: phrases.map((a) => a.id),
                            },
                        },
                    ],
                },
            });
            const newPhrases = phrases.map((s) => ({
                id: s.id,
                phrase: s.value,
                wordId: id,
            }));
            yield models_1.default.Phrase.bulkCreate(newPhrases, {
                updateOnDuplicate: ["phrase"],
            });
        }
    }
    catch (error) {
        throw new apiError_1.default(500, error.message);
    }
});
exports.putWord = putWord;
const deleteWord = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.Word.destroy({ where: { id } });
    }
    catch (error) {
        throw new apiError_1.default(500, error.message);
    }
});
exports.deleteWord = deleteWord;
const getPartsOfSpeech = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield models_1.default.PartOfSpeech.findAll({});
        const parts = response.map((p) => ({
            id: p.dataValues.id,
            value: p.dataValues.part,
        }));
        return parts;
    }
    catch (error) {
        throw new apiError_1.default(500, error.message);
    }
});
exports.getPartsOfSpeech = getPartsOfSpeech;
//# sourceMappingURL=words.service.js.map