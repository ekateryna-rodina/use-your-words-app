import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfirmState {
  isOpen: boolean;
}

const initialState: ConfirmState = {
  isOpen: false,
};

const confirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    toggleConfirm(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleConfirm } = confirmSlice.actions;
export default confirmSlice.reducer;
