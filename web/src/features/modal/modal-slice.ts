import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  currentQuiz: number | null;
}

const initialState: ModalState = {
  isOpen: false,
  currentQuiz: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const { toggle } = modalSlice.actions;
export default modalSlice.reducer;
