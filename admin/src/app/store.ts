import { configureStore } from "@reduxjs/toolkit";
import addNewReducer from "../features/addNew/addnew-slice";
import { apiSlice } from "../features/app-api-slice";
import confirmReducer from "../features/confirm/confirm-slice";
import loadingReducer from "../features/loading/loading-slice";
import modalReducer from "../features/modal/modal-slice";
import searchReducer from "../features/search/search-slice";
import tabsReducer from "../features/tabs/tabs-slice";
import wordDetailsReducer from "../features/wordDetails/worddetails-slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    tabs: tabsReducer,
    loading: loadingReducer,
    search: searchReducer,
    confirm: confirmReducer,
    wordDetails: wordDetailsReducer,
    addNew: addNewReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
