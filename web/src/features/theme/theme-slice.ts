import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  isDark: boolean;
}

const initialState: ThemeState = {
  isDark: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle(state) {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggle } = themeSlice.actions;
export default themeSlice.reducer;
