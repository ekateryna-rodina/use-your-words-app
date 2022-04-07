import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem } from "../../types";

interface MenuState {
  active: MenuItem;
}

const initialState: MenuState = {
  active: MenuItem.User,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setActive(state, action: PayloadAction<MenuItem>) {
      state.active = action.payload;
    },
  },
});

export const { setActive } = menuSlice.actions;
export default menuSlice.reducer;
