"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChooseAntonymByWordQuestion = exports.createChooseWordByAntonymQuestion = exports.createChooseWordBySynonymQuestion = exports.createChooseSynonymByWordQuestion = exports.createConnectWordsWithMeaningsQuestion = exports.createChooseWordByMeaningQuestion = exports.createChooseMeaningByWordQuestion = exports.createTypeWordByMeaningQuestion = exports.createTypeWordByPronunciationQuestion = exports.createPronounceQuestion = exports.createFillGapQuestion = void 0;
const use_your_words_common_1 = require("use-your-words-common");
const listHelper_1 = require("./listHelper");
const createFillGapQuestion = (wordInfo) => {
    const randomPhrase = (0, listHelper_1.getRandom)(wordInfo.phrases).value;
    const question = {
        __type: use_your_words_common_1.QuestionType.FillGap,
        wordId: wordInfo.id,
        answer: wordInfo.word,
        question: randomPhrase.replace(wordInfo.word, `[${wordInfo.word}]`),
    };
    return question;
};
exports.createFillGapQuestion = createFillGapQuestion;
const createPronounceQuestion = (wordInfo) => {
    const question = {
        __type: use_your_words_common_1.QuestionType.Pronounce,
        wordId: wordInfo.id,
        question: wordInfo.fileUrl,
    };
    return question;
};
exports.createPronounceQuestion = createPronounceQuestion;
const createTypeWordByPronunciationQuestion = (wordInfo) => {
    const question = {
        __type: use_your_words_common_1.QuestionType.TypeWordByPronunciation,
        wordId: wordInfo.id,
        answer: wordInfo.word,
        question: wordInfo.fileUrl,
    };
    return question;
};
exports.createTypeWordByPronunciationQuestion = createTypeWordByPronunciationQuestion;
const createTypeWordByMeaningQuestion = (wordInfo) => {
    const randomMeaning = (0, listHelper_1.getRandom)(wordInfo.meanings).value;
    const question = {
        __type: use_your_words_common_1.QuestionType.TypeWordByMeaning,
        wordId: wordInfo.id,
        answer: wordInfo.word,
        question: randomMeaning,
    };
    return question;
};
exports.createTypeWordByMeaningQuestion = createTypeWordByMeaningQuestion;
const createChooseMeaningByWordQuestion = (wordInfo, otherWordsInfo) => {
    const wrongOptions = (0, listHelper_1.randomize)(otherWordsInfo).map((o) => (0, listHelper_1.getRandom)(o.meanings).value);
    const randomMeaning = (0, listHelper_1.getRandom)(wordInfo.meanings);
    const options = [...wrongOptions, randomMeaning.value];
    const question = {
        __type: use_your_words_common_1.QuestionType.ChooseMeaningByWord,
        wordId: wordInfo.id,
        answer: randomMeaning.value,
        question: wordInfo.word,
        options,
    };
    return question;
};
exports.createChooseMeaningByWordQuestion = createChooseMeaningByWordQuestion;
const createChooseWordByMeaningQuestion = (wordInfo, otherWordsInfo) => {
    const wrongOptions = (0, listHelper_1.randomize)(otherWordsInfo).map((o) => o.word);
    const options = (0, listHelper_1.randomize)([...wrongOptions, wordInfo.word]);
    const question = {
        __type: use_your_words_common_1.QuestionType.ChooseWordByMeaning,
        wordId: wordInfo.id,
        question: (0, listHelper_1.getRandom)(wordInfo.meanings).value,
        answer: wordInfo.word,
        options,
    };
    return question;
};
exports.createChooseWordByMeaningQuestion = createChooseWordByMeaningQuestion;
const createConnectWordsWithMeaningsQuestion = (wordInfo, otherWordsInfo) => {
    const wordInfoWithRandomMeaning = Object.assign(Object.assign({}, wordInfo), { meanings: [(0, listHelper_1.getRandom)(wordInfo.meanings)] });
    const wordsInfoWithRandomMeaning = otherWordsInfo.map((wi) => (Object.assign(Object.assign({}, wi), { meanings: [(0, listHelper_1.getRandom)(wi.meanings)] })));
    const items = [wordInfoWithRandomMeaning, ...wordsInfoWithRandomMeaning];
    const words = items.map((item) => item.word);
    const meanings = items.map((item) => item.meanings[0].value);
    const question = {
        __type: use_your_words_common_1.QuestionType.ConnectWordsWithMeanings,
        wordId: wordInfo.id,
        question: {
            words: (0, listHelper_1.randomize)(words),
            meanings: (0, listHelper_1.randomize)(meanings),
        },
        answer: items.reduce((acc, curr, index) => {
            acc[curr.word] = curr.meanings[0].value;
            return acc;
        }, {}),
    };
    return question;
};
exports.createConnectWordsWithMeaningsQuestion = createConnectWordsWithMeaningsQuestion;
const createChooseSynonymByWordQuestion = (wordInfo, otherWordsInfo) => {
    const wrongOptions = (0, listHelper_1.randomize)(otherWordsInfo).map((o) => (0, listHelper_1.getRandom)(o.synonyms.map((a) => a)).value);
    const randomSynonym = (0, listHelper_1.getRandom)(wordInfo.synonyms).value;
    const options = (0, listHelper_1.randomize)([...wrongOptions, randomSynonym]);
    const question = {
        __type: use_your_words_common_1.QuestionType.ChooseSynonymByWord,
        wordId: wordInfo.id,
        question: wordInfo.word,
        answer: randomSynonym,
        options,
    };
    return question;
};
exports.createChooseSynonymByWordQuestion = createChooseSynonymByWordQuestion;
const createChooseWordBySynonymQuestion = (wordInfo, otherWordsInfo) => {
    const wrongOptions = (0, listHelper_1.randomize)(otherWordsInfo).map((o) => o.word);
    const options = (0, listHelper_1.randomize)([...wrongOptions, wordInfo.word]);
    const randomSynonym = (0, listHelper_1.getRandom)(wordInfo.synonyms);
    const question = {
        __type: use_your_words_common_1.QuestionType.ChooseWordBySynonym,
        wordId: wordInfo.id,
        question: randomSynonym.value,
        answer: wordInfo.word,
        options,
    };
    return question;
};
exports.createChooseWordBySynonymQuestion = createChooseWordBySynonymQuestion;
const createChooseWordByAntonymQuestion = (wordInfo, otherWordsInfo) => {
    const wrongOptions = (0, listHelper_1.randomize)(otherWordsInfo.filter((w) => w.antonyms.length)).map((o) => o.word);
    const options = (0, listHelper_1.randomize)([...wrongOptions, wordInfo.word]);
    const randomAntonym = (0, listHelper_1.getRandom)(wordInfo.antonyms);
    const question = {
        __type: use_your_words_common_1.QuestionType.ChooseWordByAntonym,
        wordId: wordInfo.id,
        question: randomAntonym.value,
        answer: wordInfo.word,
        options,
    };
    return question;
};
exports.createChooseWordByAntonymQuestion = createChooseWordByAntonymQuestion;
const createChooseAntonymByWordQuestion = (wordInfo, otherWordsInfo) => {
    const wrongOptions = (0, listHelper_1.randomize)(otherWordsInfo.filter((w) => w.antonyms.length)).map((o) => { var _a, _b; return (_b = (_a = (0, listHelper_1.getRandom)(o.antonyms.map((a) => a))) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : null; });
    const randomAntonym = (0, listHelper_1.getRandom)(wordInfo.antonyms).value;
    const options = (0, listHelper_1.randomize)([...wrongOptions, randomAntonym]);
    const question = {
        __type: use_your_words_common_1.QuestionType.ChooseAntonymByWord,
        wordId: wordInfo.id,
        question: wordInfo.word,
        answer: randomAntonym,
        options,
    };
    return question;
};
exports.createChooseAntonymByWordQuestion = createChooseAntonymByWordQuestion;
//# sourceMappingURL=questionFactoryHelper.js.map