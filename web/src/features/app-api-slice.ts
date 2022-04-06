import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WordWithId } from "use-your-words-common";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      fetchVocabulary: builder.query<WordWithId[], void>({
        query() {
          return "/quizzes";
        },
      }),
    };
  },
});

export const { useFetchVocabularyQuery } = apiSlice;
