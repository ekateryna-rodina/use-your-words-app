import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddNewQuizState {
  isNew: boolean;
}

const initialState: AddNewQuizState = {
  isNew: false,
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
    },
  },
});

export const { setIsNew, reset } = addNewQuizSlice.actions;
export default addNewQuizSlice.reducer;
