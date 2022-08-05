import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PartOfSpeech, WordWithId } from "../types";

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

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
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

export const {
  useFetchVocabularyQuery,
  useFetchPartsOfSpeechQuery,
  useUpdateWordMutation,
} = apiSlice;
