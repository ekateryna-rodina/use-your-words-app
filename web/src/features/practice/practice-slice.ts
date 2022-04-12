import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChallengeResults,
  QuizProgress,
  QuizResult,
  UpdateQuizChallenge,
} from "../../types";

interface PracticeState {
  currentQuizId: string;
  challenges: []; // type
  quizzesResult: Record<string, QuizResult>;
}

const initialState: PracticeState = {
  currentQuizId: "",
  challenges: [], // type and fetch with rtk query
  quizzesResult: {
    1: {
      progress: 2,
      challenges: {
        1: {
          result: ChallengeResults.None,
          dateUpdated: new Date(),
        },
        2: {
          result: ChallengeResults.Failure,
          dateUpdated: new Date(),
        },
        3: {
          result: ChallengeResults.Success,
          dateUpdated: new Date(),
        },
      },
    },
  },
};

const practiceSlice = createSlice({
  name: "practice",
  initialState,
  reducers: {
    setCurrentQuiz(state, action: PayloadAction<string>) {
      state.currentQuizId = action.payload;
    },
    updateResult(state, action: PayloadAction<UpdateQuizChallenge>) {
      const { quizId, challengeId, result, dateUpdated } = action.payload;
      state.quizzesResult[quizId]["challenges"][challengeId]["result"] = result;
      state.quizzesResult[quizId]["challenges"][challengeId]["dateUpdated"] =
        dateUpdated;
    },
    setQuizProgress(state, action: PayloadAction<QuizProgress>) {
      const { quizId, progress } = action.payload;
      state.quizzesResult[quizId]["progress"] = progress;
    },
  },
});

export const { setCurrentQuiz, updateResult, setQuizProgress } =
  practiceSlice.actions;
export default practiceSlice.reducer;
