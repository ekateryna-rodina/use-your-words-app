import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  words: string[];
}

const initialState: SearchState = {
  words: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.words = action.payload.split(" ");
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
