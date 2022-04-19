import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChallengeDnDState {
  unanswered: string[];
  answered: Record<string, string>;
}

const initialState: ChallengeDnDState = {
  unanswered: [],
  answered: {},
};

const challengedndSlice = createSlice({
  name: "challengednd",
  initialState,
  reducers: {
    setUnanswered(state, action: PayloadAction<string[]>) {
      state.unanswered = action.payload;
    },
    setAnswered(
      state,
      action: PayloadAction<{ word: string; answer: string }>
    ) {
      const moveToUnanswered = Object.keys(state.answered).reduce(
        (acc: string | undefined, curr) => {
          if (state.answered[curr] === action.payload.answer) {
            acc = curr;
            return acc;
          }
          return acc;
        },
        undefined
      );

      state.answered[action.payload.word] = action.payload.answer;

      if (!moveToUnanswered) {
        state.unanswered = state.unanswered.filter(
          (w) => !Object.keys(state.answered).includes(w)
        );
      } else {
        const index = state.unanswered.indexOf(action.payload.word);
        state.unanswered[index] = moveToUnanswered;
        delete state.answered[moveToUnanswered];
      }
    },
    reset(state, action: PayloadAction<string[]>) {
      state.unanswered = action.payload;
      state.answered = {};
    },
  },
});

export const { setUnanswered, setAnswered, reset } = challengedndSlice.actions;
export default challengedndSlice.reducer;
