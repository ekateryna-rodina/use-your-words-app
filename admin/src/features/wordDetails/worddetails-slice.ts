import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WordWithId } from "../../types";

interface WordDetailsState {
  currentWord: WordWithId | null;
  isEdit: boolean;
}

const initialState: WordDetailsState = {
  currentWord: null,
  isEdit: true,
};

const wordDetailsSlice = createSlice({
  name: "wordDetails",
  initialState,
  reducers: {
    setCurrentWord(state, action: PayloadAction<WordWithId | null>) {
      state.currentWord = action.payload;
    },
    setEditMode(state, action: PayloadAction<boolean>) {},
  },
});

export const { setCurrentWord, setEditMode } = wordDetailsSlice.actions;
export default wordDetailsSlice.reducer;
