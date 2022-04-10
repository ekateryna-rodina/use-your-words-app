import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ActiveQuizMenuState = {
  quizId: string | null;
};

const initialState: ActiveQuizMenuState = {
  quizId: null,
};

const activeQuizMenuSlice = createSlice({
  name: "activeQuizMenu",
  initialState,
  reducers: {
    setActiveQuizMenu(state, action: PayloadAction<string>) {
      state.quizId = action.payload;
    },
  },
});

export const { setActiveQuizMenu } = activeQuizMenuSlice.actions;
export default activeQuizMenuSlice.reducer;
