import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
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
