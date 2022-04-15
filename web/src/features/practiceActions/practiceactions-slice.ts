import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PracticeActionsState {
  isNext: boolean;
  isSkip: boolean;
  isHint: boolean;
  isAnswered: boolean;
}

const initialState: PracticeActionsState = {
  isNext: false,
  isSkip: false,
  isHint: false,
  isAnswered: false,
};

const practiceActionsSlice = createSlice({
  name: "practiceActions",
  initialState,
  reducers: {
    setNext(state, action: PayloadAction<boolean>) {
      state.isNext = action.payload;
    },
    setSkip(state, action: PayloadAction<boolean>) {
      state.isSkip = action.payload;
    },
    setHint(state, action: PayloadAction<boolean>) {
      state.isHint = action.payload;
    },
    setAnswered(state, action: PayloadAction<boolean>) {
      state.isAnswered = action.payload;
    },
  },
});

export const { setNext, setSkip, setHint, setAnswered } =
  practiceActionsSlice.actions;
export default practiceActionsSlice.reducer;
