import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WordWithId } from "../../types";

interface WordDetailsState {
  currentWord: WordWithId | null;
  currentWordId: string | null;
  isEdit: boolean;
}

const initialState: WordDetailsState = {
  currentWord: null,
  isEdit: false,
  currentWordId: null,
};

const wordDetailsSlice = createSlice({
  name: "wordDetails",
  initialState,
  reducers: {
    // setCurrentWord(state, action: PayloadAction<WordWithId | null>) {
    //   state.currentWord = action.payload;
    // },
    setCurrentWordId(state, action: PayloadAction<string | null>) {
      state.currentWordId = action.payload;
    },
    setEditMode(state, action: PayloadAction<boolean>) {
      state.isEdit = action.payload;
    },
    reset(state) {
      state.currentWordId = null;
      state.isEdit = false;
    },
  },
});

export const { setEditMode, setCurrentWordId, reset } =
  wordDetailsSlice.actions;
export default wordDetailsSlice.reducer;
