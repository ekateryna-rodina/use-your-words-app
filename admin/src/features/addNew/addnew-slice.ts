import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Word } from "../../types";

interface AddNewState {
  isNew: boolean;
  isAutofillError: boolean;
  word: string;
  wordDetails: Word;
  isAutofill: boolean;
}

const initialState: AddNewState = {
  isNew: false,
  word: "",
  isAutofillError: false,
  isAutofill: false,
  wordDetails: {
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
    setWord(state, action: PayloadAction<string>) {
      state.word = action.payload;
    },
    setWordDetails(state, action: PayloadAction<Word | false>) {
      if (!action.payload) {
        state.wordDetails = {
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
        };
        return;
      }
      state.wordDetails = action.payload;
    },
    setIsAutofill(state, action: PayloadAction<boolean>) {
      state.isAutofill = action.payload;
    },
    setAutofillError(state, action: PayloadAction<boolean>) {
      state.isAutofillError = action.payload;
    },
  },
});

export const {
  setIsNew,
  setWord,
  setWordDetails,
  setIsAutofill,
  setAutofillError,
} = addNewSlice.actions;
export default addNewSlice.reducer;
