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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPartsOfSpeech = exports.dropWord = exports.updateWord = exports.saveWord = exports.getAllWords = void 0;
const words_service_1 = require("../services/words.service");
function getAllWords() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const words = yield (0, words_service_1.getWords)();
            return words;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getAllWords = getAllWords;
function saveWord(word) {
    return __awaiter(this, void 0, void 0, function* () {
        const { synonyms, antonyms, phrases, meanings, partOfSpeech } = word, rest = __rest(word, ["synonyms", "antonyms", "phrases", "meanings", "partOfSpeech"]);
        const wordInfo = Object.assign({}, rest);
        const wordFullInfo = {
            wordInfo,
            partOfSpeech: partOfSpeech,
            synonyms: synonyms.map((s) => s.value),
            antonyms: antonyms.map((a) => a.value),
            phrases: phrases.map((p) => p.value),
            meanings: meanings.map((m) => m.value),
        };
        const newWord = yield (0, words_service_1.postWord)(wordFullInfo);
        return newWord;
    });
}
exports.saveWord = saveWord;
function updateWord(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, synonyms, antonyms, phrases, meanings } = data;
        try {
            const wordFullInfo = {
                id,
                synonyms: synonyms,
                antonyms: antonyms,
                phrases: phrases,
                meanings: meanings,
            };
            const newWord = yield (0, words_service_1.putWord)(wordFullInfo);
            return newWord;
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    });
}
exports.updateWord = updateWord;
function dropWord(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, words_service_1.deleteWord)(id);
            return { ok: true };
        }
        catch (error) {
            console.log(error);
            return { ok: false };
        }
    });
}
exports.dropWord = dropWord;
function fetchPartsOfSpeech() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parts = yield (0, words_service_1.getPartsOfSpeech)();
            return parts;
        }
        catch (error) {
            return null;
        }
    });
}
exports.fetchPartsOfSpeech = fetchPartsOfSpeech;
//# sourceMappingURL=words.controller.js.map