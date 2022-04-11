import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  header: string;
}

const initialState: ModalState = {
  isOpen: false,
  header: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setHeader(state, action: PayloadAction<string>) {
      state.header = action.payload;
    },
  },
});

export const { toggle, setHeader } = modalSlice.actions;
export default modalSlice.reducer;
