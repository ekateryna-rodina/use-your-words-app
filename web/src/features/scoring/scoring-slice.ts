import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChallengeResults, SuccessLevels } from "../../types";
// TODO: connect to real api
type TotalToSuccessAnswered = { totalAnswered: number; totalSuccess: number };
type ScoresByQuiz = {
  scoresByQuiz: Record<
    string,
    TotalToSuccessAnswered & { questions: Record<string, ChallengeResults> }
  >;
};
type ScoringState = TotalToSuccessAnswered &
  ScoresByQuiz & {
    globalRank: number;
    readyToNewMaterial: number;
    successLevel: SuccessLevels;
    activeDays: number;
    totalQuiz: number;
    totalQuizCompleted: number;
  };

const initialState: ScoringState = {
  globalRank: 1,
  readyToNewMaterial: 5,
  successLevel: SuccessLevels.Novice,
  activeDays: 0,
  totalQuiz: 5,
  totalQuizCompleted: 0,
  totalAnswered: 0,
  totalSuccess: 0,
  scoresByQuiz: {
    1: {
      totalAnswered: 0,
      totalSuccess: 0,
      questions: {},
    },
  },
};

const scoringSlice = createSlice({
  name: "scoring",
  initialState,
  reducers: {
    setQuestionQuizScores(
      state,
      action: PayloadAction<{
        quizId: string;
        questionId: string;
        result: ChallengeResults;
      }>
    ) {
      state.scoresByQuiz[action.payload.quizId] = {
        totalAnswered:
          state.scoresByQuiz[action.payload.quizId].totalAnswered + 1,
        totalSuccess:
          action.payload.result === ChallengeResults.Success
            ? state.scoresByQuiz[action.payload.quizId].totalSuccess + 1
            : state.scoresByQuiz[action.payload.quizId].totalSuccess + 0,
        questions: {
          ...state.scoresByQuiz[action.payload.quizId].questions,
          [action.payload.questionId]: action.payload.result,
        },
      };
    },
    setTotalScores(state, action: PayloadAction<ChallengeResults>) {
      state.totalAnswered = state.totalAnswered + 1;
      state.totalSuccess =
        action.payload === ChallengeResults.Success
          ? state.totalSuccess + 1
          : state.totalSuccess + 0;
    },
  },
});

export const { setQuestionQuizScores, setTotalScores } = scoringSlice.actions;
export default scoringSlice.reducer;
