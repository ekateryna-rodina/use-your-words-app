import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseQuestion, QuestionType } from "use-your-words-common";

interface AddNewQuizState {
  isNew: boolean;
  name: string;
  challenges: (BaseQuestion & {
    __type: QuestionType;
    word?: string;
    isSelected: boolean;
  })[];
  includedWordIds: string[];
  isShowChallengesResult: boolean;
  isSelectAllChallenges: boolean;
}

const initialState: AddNewQuizState = {
  isNew: false,
  name: "",
  challenges: [],
  includedWordIds: [],
  isShowChallengesResult: false,
  isSelectAllChallenges: true,
};

const addNewQuizSlice = createSlice({
  name: "addNewQuiz",
  initialState,
  reducers: {
    setIsNew(state, action: PayloadAction<boolean>) {
      state.isNew = action.payload;
    },
    reset(state) {
      state.isNew = false;
      state.name = "";
      state.challenges = [];
      state.includedWordIds = [];
      state.isShowChallengesResult = false;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setIncludedWordIds(state, action: PayloadAction<string[]>) {
      state.includedWordIds = action.payload;
    },
    setChallenges(
      state,
      action: PayloadAction<
        (BaseQuestion & {
          __type: QuestionType;
        } & { isSelected: boolean })[]
      >
    ) {
      state.challenges = action.payload;
    },
    setShowChallengesResult(state, action: PayloadAction<boolean>) {
      state.isShowChallengesResult = action.payload;
    },
    toggleSelection(
      state,
      action: PayloadAction<{ wordId: string; type: QuestionType }>
    ) {
      const { type, wordId } = action.payload;
      const currentChallengeIdx = state.challenges.findIndex(
        (i) => i.wordId === wordId && type === i.__type
      );
      const isSelected = state.challenges[currentChallengeIdx].isSelected;
      state.challenges[currentChallengeIdx].isSelected = !isSelected;
    },
    toggleSelectAllChallenges(state) {
      state.isSelectAllChallenges = !state.isSelectAllChallenges;
    },
  },
});

export const {
  setIsNew,
  reset,
  setName,
  setIncludedWordIds,
  setChallenges,
  setShowChallengesResult,
  toggleSelection,
  toggleSelectAllChallenges,
} = addNewQuizSlice.actions;
export default addNewQuizSlice.reducer;
