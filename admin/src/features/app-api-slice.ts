import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 } from "uuid";
import { FormValue, PartOfSpeech, Word, WordWithId } from "../types";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  tagTypes: ["Word"],
  endpoints(builder) {
    return {
      fetchVocabulary: builder.query<{ words: WordWithId[] }, void>({
        query() {
          return "/words";
        },
        providesTags: ["Word"],
      }),
      updateWord: builder.mutation<WordWithId, WordWithId>({
        query: (word: WordWithId) => ({
          url: `words/${word.id}`,
          method: "PUT",
          body: word,
        }),
        invalidatesTags: ["Word"],
        async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            apiSlice.util.updateQueryData(
              "fetchVocabulary",
              undefined,
              (draft) => {
                Object.assign(draft, patch);
              }
            )
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
            dispatch(apiSlice.util.invalidateTags(["Word"]));
          }
        },
      }),
      addNewWord: builder.mutation<WordWithId, Word>({
        query: (word: Word) => ({
          url: `words/`,
          method: "POST",
          body: word,
        }),
        invalidatesTags: ["Word"],
        async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            apiSlice.util.updateQueryData(
              "fetchVocabulary",
              undefined,
              (draft) => {
                Object.assign(draft, patch);
              }
            )
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
      }),
      deleteWord: builder.mutation<void, string>({
        query: (id) => ({
          url: `words/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Word"],
      }),
      fetchPartsOfSpeech: builder.query<PartOfSpeech[], void>({
        query() {
          return "/partOfSpeech";
        },
      }),
      autofill: builder.query<{ wordInfo: Word }, string>({
        query: (word: string) => ({
          url: `wordsApi?word=${word}`,
        }),
        transformResponse: (
          response:
            | {
                wordInfo: Word;
              }
            | Promise<{
                wordInfo: Word;
              }>
        ) => {
          if (response instanceof Promise) return response;
          const wordInfoAsObj = response as {
            wordInfo: Word;
          };
          wordInfoAsObj.wordInfo.meanings = wordInfoAsObj.wordInfo.meanings.map(
            (m: string | FormValue) => ({
              id: v4(),
              value: m as string,
            })
          );
          wordInfoAsObj.wordInfo.phrases = wordInfoAsObj.wordInfo.phrases.map(
            (m: string | FormValue) => ({
              id: v4(),
              value: m as string,
            })
          );
          wordInfoAsObj.wordInfo.synonyms = wordInfoAsObj.wordInfo.synonyms.map(
            (m: string | FormValue) => ({
              id: v4(),
              value: m as string,
            })
          );
          wordInfoAsObj.wordInfo.antonyms = wordInfoAsObj.wordInfo.antonyms.map(
            (m: string | FormValue) => ({
              id: v4(),
              value: m as string,
            })
          );
          return wordInfoAsObj;
        },
      }),
    };
  },
});

export const {
  useFetchVocabularyQuery,
  useFetchPartsOfSpeechQuery,
  useUpdateWordMutation,
  useDeleteWordMutation,
  useLazyAutofillQuery,
  useAddNewWordMutation,
} = apiSlice;
