import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BaseQuestion,
  QuestionType,
  Quiz,
  WordWithId,
} from "use-your-words-common";
import { v4 } from "uuid";
import { Challenges, FormValue, PartOfSpeech, Word } from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  tagTypes: ["Word", "Quiz"],
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
                challenges: (BaseQuestion & {
                  __type: QuestionType;
                })[];
              }
            | Promise<{
                challenges: (BaseQuestion & {
                  __type: QuestionType;
                })[];
              }>
        ) => {
          if (response instanceof Promise) return response;
          // TODO: this is a dirty solution :()
          const nameById = response.challenges
            .filter((c) => c.__type === QuestionType.FillGap)
            .reduce(
              (
                acc: { [id: string]: string },
                curr: BaseQuestion & {
                  __type: QuestionType;
                }
              ) => {
                const id = curr.wordId;
                acc[id] = curr.answer as string;
                return acc;
              },
              {}
            );
          const challengesModified = response.challenges.map((c) => ({
            ...c,
            word: nameById[c.wordId],
            isSelected: true,
          }));
          response.challenges = challengesModified;
          return response as {
            challenges: (BaseQuestion & {
              __type: QuestionType;
              word: string;
            })[];
          };
        },
      }),
      regenerateChallenge: builder.query<
        BaseQuestion & {
          __type: QuestionType;
          word?: string;
          isSelected: boolean;
        },
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
        transformResponse: (
          response:
            | (BaseQuestion & {
                __type: QuestionType;
                word?: string;
                isSelected: boolean;
              })
            | Promise<
                BaseQuestion & {
                  __type: QuestionType;
                  word?: string;
                  isSelected: boolean;
                }
              >
        ) => {
          if (response instanceof Promise) return response;
          response.isSelected = true;
          return response as BaseQuestion & {
            __type: QuestionType;
            word: string;
            isSelected: boolean;
          };
        },
      }),
      fetchQuizzes: builder.query<
        { id: string; name: string; challenges: Challenges }[],
        void
      >({
        query() {
          return "/quiz";
        },
        providesTags: ["Quiz"],
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
        invalidatesTags: ["Quiz"],
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
  useGetQuizzesQuery,
  useLazyGenerateChallengesQuery,
  useLazyRegenerateChallengeQuery,
  useAddNewQuizMutation,
  useFetchQuizzesQuery,
} = apiSlice;
