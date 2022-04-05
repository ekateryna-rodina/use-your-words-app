import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modal/modal-slice";

export const store = configureStore({
  reducer: { modal: modalReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
