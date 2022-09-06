"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const use_your_words_common_1 = require("use-your-words-common");
const questionFactoryHelper_1 = require("../utils/questionFactoryHelper");
const QuestionsFactory = (type, wordInfo, allOtherWordsInfo) => {
    switch (type) {
        case use_your_words_common_1.QuestionType.FillGap:
            return (0, questionFactoryHelper_1.createFillGapQuestion)(wordInfo);
        case use_your_words_common_1.QuestionType.Pronounce:
            return (0, questionFactoryHelper_1.createPronounceQuestion)(wordInfo);
        case use_your_words_common_1.QuestionType.TypeWordByPronunciation:
            return (0, questionFactoryHelper_1.createTypeWordByPronunciationQuestion)(wordInfo);
        case use_your_words_common_1.QuestionType.TypeWordByMeaning:
            return (0, questionFactoryHelper_1.createTypeWordByMeaningQuestion)(wordInfo);
        case use_your_words_common_1.QuestionType.ChooseMeaningByWord:
            return (0, questionFactoryHelper_1.createChooseMeaningByWordQuestion)(wordInfo, allOtherWordsInfo);
        case use_your_words_common_1.QuestionType.ChooseWordByMeaning:
            return (0, questionFactoryHelper_1.createChooseWordByMeaningQuestion)(wordInfo, allOtherWordsInfo);
        case use_your_words_common_1.QuestionType.ConnectWordsWithMeanings:
            return (0, questionFactoryHelper_1.createConnectWordsWithMeaningsQuestion)(wordInfo, allOtherWordsInfo);
        case use_your_words_common_1.QuestionType.ChooseSynonymByWord:
            if (!wordInfo.synonyms.length)
                return null;
            return (0, questionFactoryHelper_1.createChooseSynonymByWordQuestion)(wordInfo, allOtherWordsInfo);
        case use_your_words_common_1.QuestionType.ChooseWordBySynonym:
            if (!wordInfo.synonyms.length)
                return null;
            return (0, questionFactoryHelper_1.createChooseWordBySynonymQuestion)(wordInfo, allOtherWordsInfo);
        case use_your_words_common_1.QuestionType.ChooseWordByAntonym:
            if (!wordInfo.antonyms.length)
                return null;
            return (0, questionFactoryHelper_1.createChooseWordByAntonymQuestion)(wordInfo, allOtherWordsInfo);
        case use_your_words_common_1.QuestionType.ChooseAntonymByWord:
            if (!wordInfo.antonyms.length)
                return null;
            return (0, questionFactoryHelper_1.createChooseAntonymByWordQuestion)(wordInfo, allOtherWordsInfo);
        default:
            return null;
    }
};
exports.default = QuestionsFactory;
//# sourceMappingURL=questionsFactory.js.map