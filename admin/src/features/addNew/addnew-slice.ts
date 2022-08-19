import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Word } from "../../types";

interface AddNewState {
  isNew: boolean;
  word: string;
  wordDetails: Omit<Word, "word">;
  isAutofill: boolean;
}

const initialState: AddNewState = {
  isNew: false,
  word: "",
  isAutofill: false,
  wordDetails: {
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
    setWord(state, action: PayloadAction<string>) {
      state.word = action.payload;
    },
    setWordDetails(state, action: PayloadAction<Word>) {
      state.wordDetails = action.payload;
    },
    setIsAutofill(state, action: PayloadAction<boolean>) {
      state.isAutofill = action.payload;
    },
  },
});

export const { setIsNew, setWord, setWordDetails, setIsAutofill } =
  addNewSlice.actions;
export default addNewSlice.reducer;
