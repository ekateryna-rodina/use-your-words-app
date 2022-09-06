"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEditWord = exports.validateAddWord = void 0;
const Yup = __importStar(require("yup"));
const validateAddWord = Yup.object({
    words: Yup.array().min(5, "Must be at least 5 words"),
    word: Yup.string().required().min(3, "Must be 3 characters or more"),
    meaning: Yup.array().of(Yup.object()).min(1, "Must be at least 1 meaning"),
    fileUrl: Yup.string().required(),
    partOfSpeech: Yup.array(),
    phrase: Yup.array().of(Yup.object()).min(1, "Must be at least 1 phrase"),
    synonym: Yup.array().of(Yup.object()).min(1, "Must be at least 1 synonym"),
    antonym: Yup.array().of(Yup.object()).min(1, "Must be at least 1 antonym"),
});
exports.validateAddWord = validateAddWord;
const validateEditWord = Yup.object({
    meaning: Yup.array().of(Yup.object()).min(1, "Must be at least 1 meaning"),
    phrase: Yup.array().of(Yup.object()).min(1, "Must be at least 1 phrase"),
    synonym: Yup.array().of(Yup.object()).min(1, "Must be at least 1 synonym"),
    antonym: Yup.array().of(Yup.object()).min(1, "Must be at least 1 antonym"),
});
exports.validateEditWord = validateEditWord;
//# sourceMappingURL=word.js.map