import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseQuestion, QuestionType } from "use-your-words-common";
import {
  ChallengeResults,
  QuizProgress,
  QuizResult,
  UpdateQuizChallenge,
} from "../../types";

interface PracticeState {
  currentQuizId: string | null;
  currentChallengeIndex: number | null;
  currentQuizChallengeIds: string[];
  currentQuizChallenges: Record<
    string,
    BaseQuestion & { __type: QuestionType }
  >;
  quizzesResult: Record<string, QuizResult>;
}

const initialState: PracticeState = {
  currentQuizId: null,
  currentChallengeIndex: 0,
  currentQuizChallengeIds: ["1", "2", "3", "4", "5"],
  currentQuizChallenges: {
    "1": {
      wordId: "1",
      question: "Fill [thisword] the gap by entering in this sentence",
      answer: "answer",
      __type: QuestionType.TypeWordByPronunciation,
    },
    "2": {
      wordId: "2",
      question: "question 2",
      __type: QuestionType.ChooseAntonymByWord,
    },
    "3": {
      wordId: "3",
      question: "question 3",
      __type: QuestionType.ChooseAntonymByWord,
    },
    "4": {
      wordId: "4",
      question: "question 4",
      __type: QuestionType.ChooseAntonymByWord,
    },
    "5": {
      wordId: "5",
      question: "question 5",
      __type: QuestionType.ChooseAntonymByWord,
    },
  }, // type and fetch with rtk query
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
    setCurrentQuiz(state, action: PayloadAction<string | null>) {
      state.currentQuizId = action.payload;
    },
    setCurrentChallengeIndex(state, action: PayloadAction<number | null>) {
      state.currentChallengeIndex = action.payload;
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

export const {
  setCurrentQuiz,
  updateResult,
  setQuizProgress,
  setCurrentChallengeIndex,
} = practiceSlice.actions;
export default practiceSlice.reducer;
