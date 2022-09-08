import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  words: string[];
  quizWords: string[];
}

const initialState: SearchState = {
  words: [],
  quizWords: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setWordsSearch(state, action: PayloadAction<string>) {
      state.words = action.payload.split(" ");
    },
    setQuizzesSearch(state, action: PayloadAction<string>) {
      state.quizWords = action.payload.split(" ");
    },
  },
});

export const { setWordsSearch, setQuizzesSearch } = searchSlice.actions;
export default searchSlice.reducer;
