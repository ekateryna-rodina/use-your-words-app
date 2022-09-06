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
const wordsApi_service_1 = require("../services/wordsApi.service");
const cleanText = (text) => {
    if (!text)
        return "";
    try {
        return text
            .replace(/ \<b>/g, " ")
            .replace(/<\/b>/g, "")
            .replace(/ \./g, ".")
            .replace(/ \,/g, ",")
            .replace(/ \?/g, "?")
            .replace(/ \!/g, "!");
    }
    catch (error) {
        console.log(error, text);
    }
};
const mapToWord = (obj) => {
    var _a, _b, _c, _d;
    const result = {};
    result.word = obj.word;
    result.partOfSpeech = obj.meanings.map((m) => m.partOfSpeech);
    result.meanings = [
        ...obj.meanings.map((m) => [...m.definitions.map((d) => d.definition)]),
    ].flat();
    result.fileUrl = (_b = (_a = obj.phonetics.filter((p) => "audio" in p)[0]) === null || _a === void 0 ? void 0 : _a.audio) !== null && _b !== void 0 ? _b : "";
    const phrases = [
        ...Object.values(obj.collocations).map((c) => [
            ...c.examples,
        ]),
    ]
        .flat()
        .map((s) => cleanText(s));
    result.phrases = phrases;
    const synonyms = Array.from(new Set((_c = obj.synonymsAntonyms) === null || _c === void 0 ? void 0 : _c.meta.syns.map((s) => s).flat()));
    const antonyms = Array.from(new Set((_d = obj.synonymsAntonyms) === null || _d === void 0 ? void 0 : _d.meta.ants.map((s) => s).flat()));
    result.synonyms = synonyms;
    result.antonyms = antonyms;
    return result;
};
function fetchWordInfo(word) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, wordsApi_service_1.fetchInfo)(word);
            const wordInfo = mapToWord(data);
            return wordInfo;
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    });
}
exports.default = fetchWordInfo;
//# sourceMappingURL=wordsApi.controller.js.map