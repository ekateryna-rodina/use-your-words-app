import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseQuestion, QuestionType } from "use-your-words-common";
import { Challenge, Challenges, NewQuizFormSteps } from "../../types";

interface AddNewQuizState {
  isNew: boolean;
  name: string;
  challenges: Challenges;
  includedWordIds: string[];
  isSelectAllChallenges: boolean;
  step: NewQuizFormSteps;
  isNewTagAdded: boolean;
  isHideConnectedToQuiz: boolean;
}

const initialState: AddNewQuizState = {
  isNew: false,
  name: "",
  challenges: [],
  includedWordIds: [],
  isSelectAllChallenges: true,
  step: NewQuizFormSteps.Words,
  isNewTagAdded: false,
  isHideConnectedToQuiz: false,
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
      state.step = NewQuizFormSteps.Words;
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
    setStep(state, action: PayloadAction<NewQuizFormSteps>) {
      state.step = action.payload;
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
    updateSingleChallenge(
      state,
      action: PayloadAction<{ index: number; challenge: Challenge }>
    ) {
      state.challenges[action.payload.index] = action.payload.challenge;
    },
    setIsHideConnectedToQuiz(state) {
      state.isHideConnectedToQuiz = !state.isHideConnectedToQuiz;
    },
  },
});

export const {
  setIsNew,
  reset,
  setName,
  setIncludedWordIds,
  setChallenges,
  setStep,
  toggleSelection,
  toggleSelectAllChallenges,
  updateSingleChallenge,
  setIsHideConnectedToQuiz,
} = addNewQuizSlice.actions;
export default addNewQuizSlice.reducer;
