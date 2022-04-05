import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WordWithId } from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      fetchVocabulary: builder.query<WordWithId[], void>({
        query() {
          return "/vocabulary";
        },
      }),
    };
  },
});

export const { useFetchVocabularyQuery } = apiSlice;
