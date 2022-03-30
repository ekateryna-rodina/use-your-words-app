import {
  ChooseAntonymByWordQuestion,
  ChooseMeaningByWordQuestion,
  ChooseSynonymByWordQuestion,
  ChooseWordByAntonymQuestion,
  ChooseWordBySynonymQuestion,
  ConnectWordsWithMeaningsQuestion,
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
    question: (
      wordInfo.phrases[
        Math.floor(Math.random() * wordInfo.phrases.length)
      ] as WordData
    ).value.value.replace(wordInfo.word, `[${wordInfo.word}]`),
  };
  return question;
};

export const createPronounceQuestion = (wordInfo: ExistingWord) => {
  const question: PronounceQuestion = {
    __type: QuestionType.Pronounce,
    wordId: wordInfo.id,
    question: wordInfo.fileUrl,
    answer: wordInfo.word,
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
    question: wordInfo.fileUrl,
  };
  return question;
};

export const createTypeWordByMeaningQuestion = (wordInfo: ExistingWord) => {
  const question: TypeWordByMeaningQuestion = {
    __type: QuestionType.TypeWordByMeaning,
    wordId: wordInfo.id,
    answer: wordInfo.word,
    question: (
      wordInfo.phrases[
        Math.floor(Math.random() * wordInfo.meaning.length)
      ] as WordData
    ).value.value,
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
    answer: wordInfo.meaning[0].value.value,
    question: wordInfo.word,
    options,
  };
  return question;
};

export const createChooseWordByMeaningQuestion = (
  wordInfo: ExistingWord,
  otherWordsInfo: ExistingWord[]
) => {
  const wrongOptions = otherWordsInfo
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((o) => o.word);
  const options = [...wrongOptions, wordInfo.word];
  const question: ChooseMeaningByWordQuestion = {
    __type: QuestionType.ChooseMeaningByWord,
    wordId: wordInfo.id,
    question: wordInfo.meaning[0].value.value,
    answer: wordInfo.word,
    options,
  };
  return question;
};

export const createConnectWordsWithMeaningsQuestion = (
  wordInfo: ExistingWord,
  otherWordsInfo: ExistingWord[]
) => {
  const items = [wordInfo, ...otherWordsInfo]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  const words = items.map((item) => item.word);
  const meanings = items.map((item) => item.meaning[0].value.value);
  const question: ConnectWordsWithMeaningsQuestion = {
    __type: QuestionType.ConnectWordsWithMeanings,
    wordId: wordInfo.id,
    question: {
      words: words.sort(() => 0.5 - Math.random()),
      meanings: meanings.sort(() => 0.5 - Math.random()),
    },
    answer: { word: "meaning" },
  };
  return question;
};

export const createChooseSynonymByWordQuestion = (
  wordInfo: ExistingWord,
  otherWordsInfo: ExistingWord[]
) => {
  const wrongOptions = otherWordsInfo
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((o) => o.synonym[0].value.value);
  const options = [...wrongOptions, wordInfo.synonym[0].value.value];
  const question: ChooseSynonymByWordQuestion = {
    __type: QuestionType.ChooseSynonymByWord,
    wordId: wordInfo.id,
    question: wordInfo.word,
    answer: wordInfo.synonym[0].value.value,
    options,
  };
  return question;
};

export const createChooseAntonymByWordQuestion = (
  wordInfo: ExistingWord,
  otherWordsInfo: ExistingWord[]
) => {
  const wrongOptions = otherWordsInfo
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((o) => o.antonym[0].value.value);
  const options = [...wrongOptions, wordInfo.antonym[0].value.value];
  const question: ChooseAntonymByWordQuestion = {
    __type: QuestionType.ChooseAntonymByWord,
    wordId: wordInfo.id,
    question: wordInfo.word,
    answer: wordInfo.antonym[0].value.value,
    options,
  };
  return question;
};

export const createChooseWordBySynonymQuestion = (
  wordInfo: ExistingWord,
  otherWordsInfo: ExistingWord[]
) => {
  const wrongOptions = otherWordsInfo
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((o) => o.word);
  const options = [...wrongOptions, wordInfo.word];
  const question: ChooseWordBySynonymQuestion = {
    __type: QuestionType.ChooseWordBySynonym,
    wordId: wordInfo.id,
    question: wordInfo.synonym[0].value.value,
    answer: wordInfo.word,
    options,
  };
  return question;
};

export const createChooseWordByAntonymQuestion = (
  wordInfo: ExistingWord,
  otherWordsInfo: ExistingWord[]
) => {
  const wrongOptions = otherWordsInfo
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((o) => o.word);
  const options = [...wrongOptions, wordInfo.word];
  const question: ChooseWordByAntonymQuestion = {
    __type: QuestionType.ChooseWordByAntonym,
    wordId: wordInfo.id,
    question: wordInfo.antonym[0].value.value,
    answer: wordInfo.word,
    options,
  };
  return question;
};
