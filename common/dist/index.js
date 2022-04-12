"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionType = void 0;
var QuestionType;
(function (QuestionType) {
    QuestionType[QuestionType["FillGap"] = 0] = "FillGap";
    QuestionType[QuestionType["Pronounce"] = 1] = "Pronounce";
    QuestionType[QuestionType["TypeWordByPronunciation"] = 2] = "TypeWordByPronunciation";
    QuestionType[QuestionType["TypeWordByMeaning"] = 3] = "TypeWordByMeaning";
    QuestionType[QuestionType["ChooseMeaningByWord"] = 4] = "ChooseMeaningByWord";
    QuestionType[QuestionType["ChooseWordByMeaning"] = 5] = "ChooseWordByMeaning";
    QuestionType[QuestionType["ConnectWordsWithMeanings"] = 6] = "ConnectWordsWithMeanings";
    QuestionType[QuestionType["ChooseSynonymByWord"] = 7] = "ChooseSynonymByWord";
    QuestionType[QuestionType["ChooseAntonymByWord"] = 8] = "ChooseAntonymByWord";
    QuestionType[QuestionType["ChooseWordBySynonym"] = 9] = "ChooseWordBySynonym";
    QuestionType[QuestionType["ChooseWordByAntonym"] = 10] = "ChooseWordByAntonym";
})(QuestionType = exports.QuestionType || (exports.QuestionType = {}));
