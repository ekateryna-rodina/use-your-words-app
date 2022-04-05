import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/app-api-slice";
import modalReducer from "../features/modal/modal-slice";

export const store = configureStore({
  reducer: { modal: modalReducer, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
