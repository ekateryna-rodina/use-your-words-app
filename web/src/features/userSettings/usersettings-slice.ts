import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ScoringState = {
  dailyGoal: number;
};

const initialState: ScoringState = {
  dailyGoal: 20,
};

const useSettingsSlice = createSlice({
  name: "userSettings",
  initialState,
  reducers: {
    setDailyGoal(state, action: PayloadAction<number>) {
      state.dailyGoal = action.payload;
    },
  },
});

export const { setDailyGoal } = useSettingsSlice.actions;
export default useSettingsSlice.reducer;
