import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, SuccessLevels } from "../../types";

type QuizzesState = {
  quizzes: Quiz[];
};

const initialState: QuizzesState = {
  quizzes: [
    {
      quizId: "1",
      quizNumber: 1,
      words: ["word1", "word2word2", "word36766", "word4word2", "word5"],
      isEnabled: true,
      successLevel: SuccessLevels.Improved,
    },
    {
      quizId: "2",
      quizNumber: 2,
      words: ["word1", "word2word2", "word36766", "word4word2", "word5"],
      isEnabled: false,
      successLevel: SuccessLevels.Novice,
    },
    {
      quizId: "3",
      quizNumber: 3,
      words: ["word1", "word2", "word3", "word4", "word5"],
      isEnabled: false,
      successLevel: SuccessLevels.Novice,
    },
    {
      quizId: "4",
      quizNumber: 4,
      words: ["word1", "word2", "word3", "word4", "word5"],
      isEnabled: false,
      successLevel: SuccessLevels.Novice,
    },
    {
      quizId: "5",
      quizNumber: 5,
      words: ["word1", "word2", "word3", "word4", "word5"],
      isEnabled: false,
      successLevel: SuccessLevels.Novice,
    },
    {
      quizId: "6",
      quizNumber: 6,
      words: ["word1", "word2", "word3", "word4", "word5"],
      isEnabled: false,
      successLevel: SuccessLevels.Novice,
    },
  ],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    init(state, action: PayloadAction<[]>) {
      state.quizzes = action.payload;
    },
  },
});

export const { init } = quizzesSlice.actions;
export default quizzesSlice.reducer;
