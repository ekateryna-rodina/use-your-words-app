import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, SuccessLevels } from "../../types";

type QuizzesState = {
  quizzes: Quiz[];
  total: number;
  completed: number;
};

const initialState: QuizzesState = {
  quizzes: [
    {
      quizId: "1",
      quizNumber: 1,
      words: ["word1", "word2word22", "word367663", "word4word24", "word55"],
      isEnabled: true,
      successLevel: SuccessLevels.Improved,
    },
    {
      quizId: "2",
      quizNumber: 2,
      words: ["word12", "word2word23", "word367664", "word4word25", "word56"],
      isEnabled: false,
      successLevel: SuccessLevels.Novice,
    },
    {
      quizId: "3",
      quizNumber: 3,
      words: ["word14", "word2word25", "word2word24", "word2word22", "word57"],
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
  total: 6,
  completed: 2,
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
