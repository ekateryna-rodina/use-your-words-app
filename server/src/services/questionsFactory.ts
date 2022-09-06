import { BaseQuestion, QuestionType } from "use-your-words-common";
import { ExistingWord } from "../types/Word";
import {
  createChooseAntonymByWordQuestion,
  createChooseMeaningByWordQuestion,
  createChooseSynonymByWordQuestion,
  createChooseWordByAntonymQuestion,
  createChooseWordByMeaningQuestion,
  createChooseWordBySynonymQuestion,
  createConnectWordsWithMeaningsQuestion,
  createFillGapQuestion,
  createPronounceQuestion,
  createTypeWordByMeaningQuestion,
  createTypeWordByPronunciationQuestion,
} from "../utils/questionFactoryHelper";

const QuestionsFactory = (
  type: QuestionType,
  wordInfo: ExistingWord,
  allOtherWordsInfo: ExistingWord[]
): (BaseQuestion & { __type: QuestionType; word?: string }) | null => {
  switch (type) {
    case QuestionType.FillGap:
      return createFillGapQuestion(wordInfo);
    case QuestionType.Pronounce:
      return createPronounceQuestion(wordInfo);
    case QuestionType.TypeWordByPronunciation:
      return createTypeWordByPronunciationQuestion(wordInfo);
    case QuestionType.TypeWordByMeaning:
      return createTypeWordByMeaningQuestion(wordInfo);
    case QuestionType.ChooseMeaningByWord:
      return createChooseMeaningByWordQuestion(wordInfo, allOtherWordsInfo);
    case QuestionType.ChooseWordByMeaning:
      return createChooseWordByMeaningQuestion(wordInfo, allOtherWordsInfo);
    case QuestionType.ConnectWordsWithMeanings:
      return createConnectWordsWithMeaningsQuestion(
        wordInfo,
        allOtherWordsInfo
      );
    case QuestionType.ChooseSynonymByWord:
      if (!wordInfo.synonyms.length) return null;
      return createChooseSynonymByWordQuestion(wordInfo, allOtherWordsInfo);
    case QuestionType.ChooseWordBySynonym:
      if (!wordInfo.synonyms.length) return null;
      return createChooseWordBySynonymQuestion(wordInfo, allOtherWordsInfo);
    case QuestionType.ChooseWordByAntonym:
      if (!wordInfo.antonyms.length) return null;
      return createChooseWordByAntonymQuestion(wordInfo, allOtherWordsInfo);
    case QuestionType.ChooseAntonymByWord:
      if (!wordInfo.antonyms.length) return null;
      return createChooseAntonymByWordQuestion(wordInfo, allOtherWordsInfo);
    default:
      return null;
  }
};

export default QuestionsFactory;
