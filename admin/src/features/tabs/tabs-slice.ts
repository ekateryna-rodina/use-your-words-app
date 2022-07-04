import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tabs } from "../../types";

interface TabsState {
  activeTab: Tabs;
}

const initialState: TabsState = {
  activeTab: "vocabulary",
};

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<Tabs>) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = tabsSlice.actions;
export default tabsSlice.reducer;
