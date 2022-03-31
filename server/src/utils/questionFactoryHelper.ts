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
import { ExistingWord } from "../types/Word";

export const createFillGapQuestion = (wordInfo: ExistingWord) => {
  const randomIndex = Math.floor(Math.random() * wordInfo.phrases.length);
  const randomPhrase = (wordInfo.phrases[randomIndex] as any).value;
  const question: FillGapQuestion = {
    __type: QuestionType.FillGap,
    wordId: wordInfo.id,
    answer: wordInfo.word,
    question: randomPhrase.replace(wordInfo.word, `[${wordInfo.word}]`),
  };
  return question;
};

export const createPronounceQuestion = (wordInfo: ExistingWord) => {
  const question: PronounceQuestion = {
    __type: QuestionType.Pronounce,
    wordId: wordInfo.id,
    question: wordInfo.fileUrl,
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
  const randomIndex = Math.floor(Math.random() * wordInfo.meanings.length);
  const randomMeaning = (wordInfo.meanings[randomIndex] as any).value;
  const question: TypeWordByMeaningQuestion = {
    __type: QuestionType.TypeWordByMeaning,
    wordId: wordInfo.id,
    answer: wordInfo.word,
    question: randomMeaning,
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
    .map((o) => (o.meanings[0] as any).value);
  const options = [...wrongOptions, (wordInfo.meanings[0] as any).value];
  const question: ChooseMeaningByWordQuestion = {
    __type: QuestionType.ChooseMeaningByWord,
    wordId: wordInfo.id,
    answer: (wordInfo.meanings[0] as any).value,
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
    question: (wordInfo.meanings[0] as any).value,
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
  const meanings = items.map((item) => (item.meanings[0] as any).value);
  const question: ConnectWordsWithMeaningsQuestion = {
    __type: QuestionType.ConnectWordsWithMeanings,
    wordId: wordInfo.id,
    question: {
      words: words.sort(() => 0.5 - Math.random()),
      meanings: meanings.sort(() => 0.5 - Math.random()),
    },
    answer: items.reduce((acc: Record<string, string>, curr, index) => {
      acc[curr.word] = (curr.meanings[0] as any).value;
      return acc;
    }, {}),
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
    .map((o) => (o.synonyms[0] as any).value);
  const options = [...wrongOptions, (wordInfo.synonyms[0] as any).value];

  const question: ChooseSynonymByWordQuestion = {
    __type: QuestionType.ChooseSynonymByWord,
    wordId: wordInfo.id,
    question: wordInfo.word,
    answer: (wordInfo.synonyms[0] as any).value,
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
    .map((o) => (o.antonyms[0] as any).value);
  const options = [...wrongOptions, (wordInfo.antonyms[0] as any).value];
  const question: ChooseAntonymByWordQuestion = {
    __type: QuestionType.ChooseAntonymByWord,
    wordId: wordInfo.id,
    question: wordInfo.word,
    answer: (wordInfo.antonyms[0] as any).value,
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
    question: (wordInfo.synonyms[0] as any).value,
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
    question: (wordInfo.antonyms[0] as any).value,
    answer: wordInfo.word,
    options,
  };

  return question;
};
