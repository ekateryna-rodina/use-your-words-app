"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeed = void 0;
const models_1 = __importDefault(require("../models"));
const antonyms_1 = require("./antonyms");
const meanings_1 = require("./meanings");
const partOfSpeech_1 = require("./partOfSpeech");
const phrases_1 = require("./phrases");
const synonyms_1 = require("./synonyms");
const wordPartOfSpeech_1 = require("./wordPartOfSpeech");
const words_1 = require("./words");
function createWords() {
    words_1.words.forEach((w) => {
        models_1.default.Word.create(w);
    });
}
function createPartOfSpeech() {
    partOfSpeech_1.partsOfSpeech.map((p) => {
        models_1.default.PartOfSpeech.create(p);
    });
}
function createWordPartOfSpeech() {
    wordPartOfSpeech_1.wordPartOfSpeech.map((wp) => {
        models_1.default.WordPartOfSpeech.create(wp);
    });
}
function restInfo() {
    const wordId = "7315f619-563f-44c3-9342-47eb07c56e0c";
    meanings_1.meanings.map((m) => {
        models_1.default.Meaning.create(Object.assign(Object.assign({}, m), { wordId }));
    });
    phrases_1.phrases.map((p) => {
        models_1.default.Phrase.create(Object.assign(Object.assign({}, p), { wordId }));
    });
    synonyms_1.synonyms.map((s) => {
        models_1.default.Synonym.create(Object.assign(Object.assign({}, s), { wordId }));
    });
    antonyms_1.antonyms.map((a) => {
        models_1.default.Antonym.create(Object.assign(Object.assign({}, a), { wordId }));
    });
}
function runSeed() {
}
exports.runSeed = runSeed;
//# sourceMappingURL=init.js.map