import {
  ChooseAntonymByWordQuestion,
  ChooseMeaningByWordQuestion,
  ChooseSynonymByWordQuestion,
  ChooseWordByAntonymQuestion,
  ChooseWordByMeaningQuestion,
  ChooseWordBySynonymQuestion,
  ConnectWordsWithMeaningsQuestion,
  FillGapQuestion,
  PronounceQuestion,
  QuestionType,
  TypeWordByMeaningQuestion,
  TypeWordByPronunciationQuestion,
} from "use-your-words-common";
import { ExistingWord, Value } from "../types/Word";
import { getRandom, randomize } from "./listHelper";

export const createFillGapQuestion = (wordInfo: ExistingWord) => {
  const randomPhrase = getRandom(wordInfo.phrases as Value[]).value;
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
  const randomMeaning = getRandom(wordInfo.meanings as Value[]).value;
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
  const wrongOptions = randomize(otherWordsInfo).map(
    (o) => getRandom(o.meanings as Value[]).value
  );
  const randomMeaning = getRandom(wordInfo.meanings as Value[]);
  const options = [...wrongOptions, randomMeaning.value];
  const question: ChooseMeaningByWordQuestion = {
    __type: QuestionType.ChooseMeaningByWord,
    wordId: wordInfo.id,
    answer: randomMeaning.value,
    question: wordInfo.word,
    options,
  };

  return question;
};

export const createChooseWordByMeaningQuestion = (
  wordInfo: ExistingWord,
  otherWordsInfo: ExistingWord[]
) => {
  const wrongOptions = randomize(otherWordsInfo).map((o) => o.word);
  const options = randomize([...wrongOptions, wordInfo.word]);
  const question: ChooseWordByMeaningQuestion = {
    __type: QuestionType.ChooseWordByMeaning,
    wordId: wordInfo.id,
    question: getRandom(wordInfo.meanings as Value[]).value,
    answer: wordInfo.word,
    options,
  };

  return question;
};

export const createConnectWordsWithMeaningsQuestion = (
  wordInfo: ExistingWord,
  otherWordsInfo: ExistingWord[]
) => {
  const wordInfoWithRandomMeaning: ExistingWord = {
    ...wordInfo,
    meanings: [getRandom(wordInfo.meanings as Value[])],
  };
  const wordsInfoWithRandomMeaning: ExistingWord[] = otherWordsInfo.map(
    (wi) => ({
      ...wi,
      meanings: [getRandom(wi.meanings as Value[])],
    })
  );

  const items = [wordInfoWithRandomMeaning, ...wordsInfoWithRandomMeaning];
  const words = items.map((item) => item.word);
  const meanings = items.map((item) => (item.meanings[0] as any).value);
  const question: ConnectWordsWithMeaningsQuestion = {
    __type: QuestionType.ConnectWordsWithMeanings,
    wordId: wordInfo.id,
    question: {
      words: randomize(words),
      meanings: randomize(meanings),
    },
    answer: items.reduce((acc: Record<string, string>, curr, index) => {
      acc[curr.word] = (curr.meanings[0] as Value).value;
      return acc;
    }, {}),
  };

  return question;
};

export const createChooseSynonymByWordQuestion = (
  wordInfo: ExistingWord,
  otherWordsInfo: ExistingWord[]
) => {
  const wrongOptions = randomize<ExistingWord>(otherWordsInfo).map(
    (o: ExistingWord) => getRandom(o.synonyms.map((a) => a as Value)).value
  );
  const randomSynonym = getRandom(wordInfo.synonyms as Value[]).value;

  const options = randomize([...wrongOptions, randomSynonym]);

  const question: ChooseSynonymByWordQuestion = {
    __type: QuestionType.ChooseSynonymByWord,
    wordId: wordInfo.id,
    question: wordInfo.word,
    answer: randomSynonym,
    options,
  };
  return question;
};

export const createChooseAntonymByWordQuestion = (
  wordInfo: ExistingWord,
  otherWordsInfo: ExistingWord[]
) => {
  console.log("generating quu");
  const wrongOptions = randomize<ExistingWord>(otherWordsInfo).map(
    (o: ExistingWord) =>
      getRandom(o.antonyms.map((a) => a as Value))?.value ?? null
  );

  const randomAntonym = getRandom(wordInfo.antonyms as Value[]).value;
  const wrongOptionsFiltered = wrongOptions.filter((o) => o);
  // handle edge case when there is not enough wrong options
  const minWrongOptionsCount = 3;
  if (wrongOptionsFiltered.length < minWrongOptionsCount) {
    console.log("something went wron quu");
    return null;
  }
  const options = randomize([...wrongOptionsFiltered, randomAntonym]);
  const question: ChooseAntonymByWordQuestion = {
    __type: QuestionType.ChooseAntonymByWord,
    wordId: wordInfo.id,
    question: wordInfo.word,
    answer: randomAntonym,
    options,
  };

  return question;
};

export const createChooseWordBySynonymQuestion = (
  wordInfo: ExistingWord,
  otherWordsInfo: ExistingWord[]
) => {
  const wrongOptions = randomize<ExistingWord>(otherWordsInfo).map(
    (o: ExistingWord) => o.word
  );
  const options = randomize([...wrongOptions, wordInfo.word]);
  const randomSynonym = getRandom<Value>(wordInfo.synonyms as Value[]);
  const question: ChooseWordBySynonymQuestion = {
    __type: QuestionType.ChooseWordBySynonym,
    wordId: wordInfo.id,
    question: randomSynonym.value,
    answer: wordInfo.word,
    options,
  };

  return question;
};

export const createChooseWordByAntonymQuestion = (
  wordInfo: ExistingWord,
  otherWordsInfo: ExistingWord[]
) => {
  const wrongOptions = randomize<ExistingWord>(otherWordsInfo).map(
    (o: ExistingWord) => o.word
  );
  const options = randomize([...wrongOptions, wordInfo.word]);
  const randomAntonym = getRandom<Value>(wordInfo.antonyms as Value[]);
  const question: ChooseWordByAntonymQuestion = {
    __type: QuestionType.ChooseWordByAntonym,
    wordId: wordInfo.id,
    question: randomAntonym.value,
    answer: wordInfo.word,
    options,
  };

  return question;
};
