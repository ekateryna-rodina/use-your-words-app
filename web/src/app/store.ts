import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/app-api-slice";
import menuReducer from "../features/menu/menu-slice";
import modalReducer from "../features/modal/modal-slice";
import quizzesReducer from "../features/quizzes/quizzes-slice";
import themeReducer from "../features/theme/theme-slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    theme: themeReducer,
    menu: menuReducer,
    quizzes: quizzesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
