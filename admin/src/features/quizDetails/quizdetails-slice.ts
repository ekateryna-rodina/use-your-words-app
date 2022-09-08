import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizDetailsState {
  currentQuizId: string | null;
}

const initialState: QuizDetailsState = {
  currentQuizId: null,
};

const quizDetailsSlice = createSlice({
  name: "quizDetails",
  initialState,
  reducers: {
    setCurrentQuiz(state, action: PayloadAction<string>) {
      state.currentQuizId = action.payload;
    },
    reset(state) {
      state.currentQuizId = null;
    },
  },
});

export const { setCurrentQuiz, reset } = quizDetailsSlice.actions;
export default quizDetailsSlice.reducer;
