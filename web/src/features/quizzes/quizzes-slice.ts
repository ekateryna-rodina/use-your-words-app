import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, SuccessLevels } from "../../types";

type QuizzesState = {
  quizzes: Quiz[];
  total: number;
  completed: number;
  learnCurrentId: string | null;
};

const initialState: QuizzesState = {
  quizzes: [
    {
      quizId: "1",
      quizNumber: 1,
      isEnabled: true,
      successLevel: SuccessLevels.Improved,
      words: {
        word1: {
          id: "1",
          word: "word1",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word2word22: {
          id: "2",
          word: "word2word22",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word367663: {
          id: "3",
          word: "word367663",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word4word24: {
          id: "4",
          word: "word4word24",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word55: {
          id: "5",
          word: "word55",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
      },
    },
    {
      quizId: "2",
      quizNumber: 2,
      isEnabled: false,
      successLevel: SuccessLevels.Novice,
      words: {
        word1: {
          id: "1",
          word: "word1",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word2word22: {
          id: "2",
          word: "word2word22",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word367663: {
          id: "3",
          word: "word367663",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word4word24: {
          id: "4",
          word: "word4word24",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word55: {
          id: "5",
          word: "word55",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
      },
    },
    {
      quizId: "3",
      quizNumber: 3,
      isEnabled: false,
      successLevel: SuccessLevels.Novice,
      words: {
        word1: {
          id: "1",
          word: "word1",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word2word22: {
          id: "2",
          word: "word2word22",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word367663: {
          id: "3",
          word: "word367663",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word4word24: {
          id: "4",
          word: "word4word24",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word55: {
          id: "5",
          word: "word55",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
      },
    },
    {
      quizId: "4",
      quizNumber: 4,
      isEnabled: false,
      successLevel: SuccessLevels.Novice,
      words: {
        word1: {
          id: "1",
          word: "word1",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word2word22: {
          id: "2",
          word: "word2word22",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word367663: {
          id: "3",
          word: "word367663",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word4word24: {
          id: "4",
          word: "word4word24",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word55: {
          id: "5",
          word: "word55",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
      },
    },
    {
      quizId: "5",
      quizNumber: 5,
      isEnabled: false,
      successLevel: SuccessLevels.Novice,
      words: {
        word1: {
          id: "1",
          word: "word1",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word2word22: {
          id: "2",
          word: "word2word22",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word367663: {
          id: "3",
          word: "word367663",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word4word24: {
          id: "4",
          word: "word4word24",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word55: {
          id: "5",
          word: "word55",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
      },
    },
    {
      quizId: "6",
      quizNumber: 6,
      isEnabled: false,
      successLevel: SuccessLevels.Novice,
      words: {
        word1: {
          id: "1",
          word: "word1",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word2word22: {
          id: "2",
          word: "word2word22",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word367663: {
          id: "3",
          word: "word367663",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word4word24: {
          id: "4",
          word: "word4word24",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
        word55: {
          id: "5",
          word: "word55",
          fileUrl: "file",
          meanings: [
            { id: "1", value: "mean1" },
            { id: "2", value: "mean2" },
          ],
          partOfSpeech: [
            { id: "1", value: "adjec" },
            { id: "2", value: "noun" },
          ],
          phrases: [
            { id: "1", value: "11er" },
            { id: "2", value: "22errr" },
          ],

          synonyms: [
            { id: "1", value: "11ere" },
            { id: "2", value: "22wf" },
          ],
          antonyms: [
            { id: "1", value: "11dfs" },
            { id: "2", value: "22efwe" },
          ],
        },
      },
    },
  ],
  total: 6,
  completed: 2,
  learnCurrentId: null,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    init(state, action: PayloadAction<[]>) {
      state.quizzes = action.payload;
    },
    setLearnQuizId(state, action: PayloadAction<string>) {
      state.learnCurrentId = action.payload;
    },
  },
});

export const { init, setLearnQuizId } = quizzesSlice.actions;
export default quizzesSlice.reducer;
