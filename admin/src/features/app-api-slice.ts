import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PartOfSpeech, WordWithId } from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      fetchVocabulary: builder.query<{ words: WordWithId[] }, void>({
        query() {
          return "/words";
        },
      }),
      fetchPartsOfSpeech: builder.query<PartOfSpeech[], void>({
        query() {
          return "/partOfSpeech";
        },
      }),
    };
  },
});

export const { useFetchVocabularyQuery, useFetchPartsOfSpeechQuery } = apiSlice;
