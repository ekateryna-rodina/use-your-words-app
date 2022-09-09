import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BaseQuestion,
  QuestionType,
  Quiz,
  WordWithId,
} from "use-your-words-common";
import { v4 } from "uuid";
import { Challenge, Challenges, FormValue, PartOfSpeech, Word } from "../types";
import { isEqualType, transformChallenges } from "../utils/apiTransform";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  tagTypes: ["Word", "Quiz", "Tag"],
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
      getQuizzes: builder.query<Quiz[], void>({
        query() {
          return "/quiz";
        },
      }),
      generateChallenges: builder.query<
        {
          challenges: (BaseQuestion & {
            __type: QuestionType;
            word?: string;
          })[];
        },
        string[]
      >({
        query(ids: string[]) {
          return `/challenges?wordIds=${ids.join(",")}`;
        },
        transformResponse: (
          response:
            | {
                challenges: Challenges;
              }
            | Promise<{
                challenges: Challenges;
              }>
        ) => {
          if (response instanceof Promise) return response;
          response.challenges = transformChallenges(
            response.challenges,
            (current: QuestionType, target: QuestionType) => current === target,
            true
          );
          return response;
        },
      }),
      regenerateChallenge: builder.query<
        Challenge,
        {
          wordId: string;
          type: QuestionType;
          quizWordIds: string[];
          word: string;
        }
      >({
        query({ wordId, type, quizWordIds, word }) {
          return `/challenge?wordId=${wordId}&questionType=${type}&word=${word}&quizWordIds=${quizWordIds.join(
            ","
          )}`;
        },
        transformResponse: (response: Challenge | Promise<Challenge>) => {
          if (response instanceof Promise) return response;
          response.isSelected = true;
          return response;
        },
      }),
      fetchQuizzes: builder.query<Quiz[], void>({
        query() {
          return "/quiz";
        },
        providesTags: ["Quiz"],
        transformResponse: (response: Quiz[] | Promise<Quiz[]>) => {
          if (response instanceof Promise) return response;
          for (let quiz of response) {
            quiz.challenges = transformChallenges(quiz.challenges, isEqualType);
          }
          return response;
        },
      }),
      addNewQuiz: builder.mutation<
        void,
        { name: string; challenges: Challenges }
      >({
        query: ({ name, challenges }) => ({
          url: `quiz/`,
          method: "POST",
          body: { name, challenges },
        }),
        invalidatesTags: ["Quiz", "Word"],
      }),
      deleteQuiz: builder.mutation<void, string>({
        query: (id) => ({
          url: `quiz?id=${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Quiz", "Word"],
      }),
      fetchTags: builder.query<
        { tagsInfo: { id: string; name: string }[] },
        void
      >({
        query: (id) => ({
          url: "tags/",
        }),
      }),
      saveTags: builder.mutation<void, string[]>({
        query: (id) => ({
          url: "tags/",
          method: "POST",
        }),
        invalidatesTags: ["Tag"],
      }),
    };
  },
});

export const {
  useFetchVocabularyQuery,
  useFetchPartsOfSpeechQuery,
  useUpdateWordMutation,
  useDeleteWordMutation,
  useDeleteQuizMutation,
  useLazyAutofillQuery,
  useAddNewWordMutation,
  useGetQuizzesQuery,
  useLazyGenerateChallengesQuery,
  useLazyRegenerateChallengeQuery,
  useAddNewQuizMutation,
  useFetchQuizzesQuery,
  useFetchTagsQuery,
  useSaveTagsMutation,
} = apiSlice;
