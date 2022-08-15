import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Word } from "../../types";

interface AddNewState {
  isNew: boolean;
  word: Word;
}

const initialState: AddNewState = {
  isNew: false,
  word: {
    word: "",
    fileUrl: "",
    meanings: [],
    partOfSpeech: [],
    phrases: [],
    synonyms: [],
    antonyms: [],
    pronunciationRadio: "upload",
    uploadPronunciation: "",
    recordPronunciation: "",
  },
};

const addNewSlice = createSlice({
  name: "addNew",
  initialState,
  reducers: {
    setIsNew(state, action: PayloadAction<boolean>) {
      state.isNew = action.payload;
    },
  },
});

export const { setIsNew } = addNewSlice.actions;
export default addNewSlice.reducer;
