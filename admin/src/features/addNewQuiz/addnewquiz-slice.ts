import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseQuestion, QuestionType } from "use-your-words-common";

interface AddNewQuizState {
  isNew: boolean;
  name: string;
  challenges: (BaseQuestion & {
    __type: QuestionType;
  })[];
  includedWordIds: string[];
}

const initialState: AddNewQuizState = {
  isNew: false,
  name: "",
  challenges: [],
  includedWordIds: [],
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
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setIncludedWordIds(state, action: PayloadAction<string[]>) {
      state.includedWordIds = action.payload;
    },
  },
});

export const { setIsNew, reset, setName, setIncludedWordIds } =
  addNewQuizSlice.actions;
export default addNewQuizSlice.reducer;
