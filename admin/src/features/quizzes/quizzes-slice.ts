import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz } from "use-your-words-common";

interface QuizzesState {
  all: Quiz[];
}

const initialState: QuizzesState = {
  all: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes(state, action: PayloadAction<Quiz[]>) {
      state.all = action.payload;
    },
  },
});

export const { setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;
