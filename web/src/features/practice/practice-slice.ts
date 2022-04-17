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
  currentQuizChallengeIds: ["5", "2", "3", "4", "1"],
  currentQuizChallenges: {
    "1": {
      wordId: "1",
      question: "Thisisaword",
      answer: "answeranswerans",
      options: [
        "answeranswerans answerans werans answe ranswer ans answera  nswerans answ eranswerans",
        "anwer anwera nwer anweranwer anwer anwer answeranswerans answ eranswerans",
        "anweranweranwer anweranwer anwer anwer",
        "anwe ranw eranwer a nwer anwer anwer anwer answ eransw eransan sweranswerans",
      ],
      __type: QuestionType.ChooseMeaningByWord,
    },
    "2": {
      wordId: "2",
      question:
        "answeranswerans answerans werans answe ranswer ans answera  nswerans answ eranswerans Thisisaword",
      answer: "answeranswerans",
      options: ["answeranswerans", "anwer", "anweranweranwer", "anwer"],
      __type: QuestionType.ChooseWordByMeaning,
    },
    "3": {
      wordId: "3",
      question: "Qord ",
      answer: "antonym 1",
      options: ["antonym 1", "antonym 2", "antonym 3", "antonym 4"],
      __type: QuestionType.ChooseAntonymByWord,
    },
    "4": {
      wordId: "4",
      question: "Qord ",
      answer: "antonym 1",
      options: ["antonym 1", "antonym 2", "antonym 3", "antonym 4"],
      __type: QuestionType.ChooseAntonymByWord,
    },
    "5": {
      wordId: "5",
      question: {
        words: ["word 1", "word 2", "word 3", "word 4", "word 5"],
        meanings: [
          "meaning 1 meaning 1meaning 1meaning 1meaning 1meaning 1",
          "meaning 2 meaning 2meaning 2meaning 2meaning 2meaning 2",
          "meaning 3 meaning 3meaning 3meaning 3meaning 3meaning 3",
          "meaning 4 meaning 4meaning 4meaning 4 meaning 4 meaning 4meaning 4meaning 4",
          "meaning 5 meaning 5 meaning 5 meaning 5",
        ],
      },
      answer: {
        "word 1": "meaning 1 meaning 1meaning 1meaning 1meaning 1meaning 1",
        "word 2": "meaning 2 meaning 2meaning 2meaning 2meaning 2meaning 2",
        "word 3": "meaning 3 meaning 3meaning 3meaning 3meaning 3meaning 3",
        "word 4":
          "meaning 4 meaning 4meaning 4meaning 4 meaning 4 meaning 4meaning 4meaning 4",
        "word 5": "meaning 5 meaning 5 meaning 5 meaning 5",
      },
      __type: QuestionType.ConnectWordsWithMeanings,
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
