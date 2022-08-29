import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Word } from "../../types";

interface AddNewState {
  isNew: boolean;
  isAutofillError: boolean;
  word: string;
  wordDetails: Word;
  isAutofill: boolean;
  pronounceFileType: "autofill" | "upload" | "record";
  media: {
    file: File | string | null;
    error: boolean;
  };
}

const initialState: AddNewState = {
  isNew: false,
  word: "",
  isAutofillError: false,
  isAutofill: false,
  pronounceFileType: "upload",
  media: { file: null, error: false },
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
    setPronounceType(
      state,
      action: PayloadAction<"autofill" | "upload" | "record">
    ) {
      state.pronounceFileType = action.payload;
    },
    setMediaFile(state, action: PayloadAction<File | string>) {
      state.media.file = action.payload;
    },
    setMediaError(state, action: PayloadAction<boolean>) {
      state.media.error = action.payload;
    },
    reset(state) {
      state.isNew = false;
      state.isAutofill = false;
      state.word = "";
      state.isAutofillError = false;
      state.isAutofill = false;
      state.pronounceFileType = "upload";
      state.media = { file: null, error: false };
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
    },
  },
});

export const {
  setIsNew,
  setWord,
  setWordDetails,
  setIsAutofill,
  setAutofillError,
  setPronounceType,
  setMediaFile,
  setMediaError,
  reset,
} = addNewSlice.actions;
export default addNewSlice.reducer;
