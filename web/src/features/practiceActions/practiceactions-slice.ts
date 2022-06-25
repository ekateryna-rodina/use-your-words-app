import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChallengeResults } from "../../types";

interface PracticeActionsState {
  isNext: boolean;
  isSkip: boolean;
  isHint: boolean;
  isAnswered: boolean;
  isHintAvailable: boolean;
  result: ChallengeResults;
  correctAnswer: string | null;
}

const initialState: PracticeActionsState = {
  isNext: false,
  isSkip: false,
  isHint: false,
  isAnswered: false,
  isHintAvailable: true,
  result: ChallengeResults.None,
  correctAnswer: null,
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
    setHintIsAvailable(state, action: PayloadAction<boolean>) {
      state.isHintAvailable = action.payload;
    },
    setAnsweredResult(
      state,
      action: PayloadAction<{
        result: ChallengeResults;
      }>
    ) {
      state.result = action.payload.result;
    },
    setCorrectAnswer(state, action: PayloadAction<string | null>) {
      state.correctAnswer = action.payload;
    },
  },
});

export const {
  setNext,
  setSkip,
  setHint,
  setAnswered,
  setHintIsAvailable,
  setAnsweredResult,
  setCorrectAnswer,
} = practiceActionsSlice.actions;
export default practiceActionsSlice.reducer;
