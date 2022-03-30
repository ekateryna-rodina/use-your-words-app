import {
  ChooseMeaningByWordQuestion,
  ChooseWordByMeaningQuestion,
  FillGapQuestion,
  PronounceQuestion,
  QuestionType,
  TypeWordByMeaningQuestion,
  TypeWordByPronunciationQuestion,
} from "../types/Question";
import { ExistingWord, WordData } from "../types/Word";

export const createFillGapQuestion = (wordInfo: ExistingWord) => {
  const question: FillGapQuestion = {
    __type: QuestionType.FillGap,
    wordId: wordInfo.id,
    answer: wordInfo.word,
    phrase: (
      wordInfo.phrases[
        Math.floor(Math.random() * wordInfo.phrases.length)
      ] as WordData
    ).value.value,
  };
  return question;
};

export const createPronounceQuestion = (wordInfo: ExistingWord) => {
  const question: PronounceQuestion = {
    __type: QuestionType.Pronounce,
    wordId: wordInfo.id,
    fileUrl: wordInfo.fileUrl,
  };
  return question;
};

export const createTypeWordByPronunciationQuestion = (
  wordInfo: ExistingWord
) => {
  const question: TypeWordByPronunciationQuestion = {
    __type: QuestionType.TypeWordByPronunciation,
    wordId: wordInfo.id,
    answer: wordInfo.word,
    fileUrl: wordInfo.fileUrl,
  };
  return question;
};

export const createTypeWordByMeaningQuestion = (wordInfo: ExistingWord) => {
  const question: TypeWordByMeaningQuestion = {
    __type: QuestionType.TypeWordByMeaning,
    wordId: wordInfo.id,
    answer: wordInfo.word,
    meaning: (
      wordInfo.phrases[
        Math.floor(Math.random() * wordInfo.meaning.length)
      ] as WordData
    ).value.value,
  };
  return question;
};

const createChooseWordByMeaningQuestion = (
  wordInfo: ExistingWord,
  otherWordsInfo: ExistingWord[]
) => {
  const wrongOptions = otherWordsInfo
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((o) => o.meaning[0].value.value);
  const options = [...wrongOptions, wordInfo.meaning[0].value.value];
  const question: ChooseWordByMeaningQuestion = {
    __type: QuestionType.ChooseWordByMeaning,
    wordId: wordInfo.id,
    answer: wordInfo.word,
    options,
  };
  return question;
};

export const createChooseMeaningByWordQuestion = (
  wordInfo: ExistingWord,
  otherWordsInfo: ExistingWord[]
) => {
  const wrongOptions = otherWordsInfo
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((o) => o.meaning[0].value.value);
  const options = [...wrongOptions, wordInfo.meaning[0].value.value];
  const question: ChooseMeaningByWordQuestion = {
    __type: QuestionType.ChooseMeaningByWord,
    wordId: wordInfo.id,
    answer: wordInfo.word,
    options,
  };
  return question;
};

const createChooseWordByMeaningQuestion = (
  wordInfo: ExistingWord,
  otherWordsInfo: ExistingWord[]
) => {
  const wrongOptions = otherWordsInfo
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((o) => o.meaning[0].value.value);
  const options = [...wrongOptions, wordInfo.meaning[0].value.value];
  const question: ChooseMeaningByWordQuestion = {
    __type: QuestionType.ChooseMeaningByWord,
    wordId: wordInfo.id,
    answer: wordInfo.word,
    options,
  };
  return question;
};
