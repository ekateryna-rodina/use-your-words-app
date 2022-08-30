import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { WordWithId } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setIncludedWordIds,
  setName,
} from "../../features/addNewQuiz/addnewquiz-slice";
import { apiSlice } from "../../features/app-api-slice";
import CloseIcon from "../icons/CloseIcon";
import SaveIcon from "../icons/SaveIcon";
import { QuizQuestionsTable } from "../QuizQuestionsTable";

const NewQuizEditable = () => {
  const [minQuizQuestions, maxQuizQuestions] = [3, 7];
  const { isLoading } = useAppSelector((state) => state.loading);
  const { includedWordIds } = useAppSelector((state) => state.addNewQuiz);
  const [showChallengesTable, setShowChallengesTable] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [
    generateChallenges,
    { data, isError, isLoading: challengeGenerationLoading },
  ] = apiSlice.endpoints.generateChallenges.useLazyQuery();
  const [showWordsWithoutQuizOnly, setShowWordsWithoutQuizOnly] =
    useState<boolean>(false);
  const { data: vocabularyWords } =
    apiSlice.endpoints.fetchVocabulary.useQueryState();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>({});
  const onSaveQuizHandler = (values: any) => {};
  const onNewQuizNameEnterHandler = (name: string) => {
    dispatch(setName(name));
  };
  const reseQuizNameHandler = () => {
    dispatch(setName(""));
  };
  const includeWordHandler = (word: WordWithId) => {
    const isIncluded = includedWordIds.filter(
      (id: string) => id === word.id
    ).length;
    let wordsToInclude = [];
    if (isIncluded) {
      wordsToInclude = includedWordIds.filter((w) => w !== word.id);
    } else {
      wordsToInclude = [...includedWordIds, word.id];
    }
    dispatch(setIncludedWordIds(wordsToInclude));
  };
  const generateChallengesHandler = () => {
    generateChallenges(includedWordIds);
  };
  useEffect(() => {
    if (data?.challenges.length) {
      setShowChallengesTable(true);
    }
  }, [data]);
  return (
    <div className="modal-container">
      <form
        onSubmit={handleSubmit(
          (data) => onSaveQuizHandler(data),
          (e) => {
            console.log(e);
          }
        )}
      >
        <div className="relative w-full flex justify-start items-center gap-2">
          <div className="relative w-[60%]">
            <input
              type="text"
              className="w-full"
              placeholder="Type name for a quiz..."
              {...register("name", {
                onChange: (e) => {
                  onNewQuizNameEnterHandler(e.currentTarget.value);
                },
              })}
            />
            <div className="absolute top-[50%] right-[10px] -translate-y-1/2">
              <button
                onClick={reseQuizNameHandler}
                className="flex justify-center items-center"
              >
                <CloseIcon size={10} />
              </button>
            </div>
          </div>
          {Object.keys(errors).length ? (
            <div className="absolute left-0 -bottom-8 flex flex-col">
              {Object.values(errors).map((v: any) => (
                <small key={v.message} className="text-red">
                  {v.message}
                </small>
              ))}
            </div>
          ) : (
            <></>
          )}
          <div className="relative w-8 h-8">
            <input
              type="submit"
              className="bg-emerald-300 w-full h-full"
              value=""
            />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex justify-center items-center">
              {isLoading ? <div className="loading"></div> : <SaveIcon />}
            </div>
          </div>
        </div>

        <div className="quiz-questions-container mt-4 relative">
          <div
            className={`absolute top-0 left-0 right-0 ${
              showChallengesTable ? "-translate-x-full" : ""
            }`}
          >
            <h2 className="text-slate-300 font-bold">Including Words</h2>
            <div className="flex justify-between items-center border-b-[1px] border-dotted py-4 border-slate-300">
              <label htmlFor="showWordsWithoutQuizOnly" className="text-sm">
                <input
                  type="checkbox"
                  id="showWordsWithoutQuizOnly"
                  checked={showWordsWithoutQuizOnly}
                  className="mr-2"
                  onChange={() =>
                    setShowWordsWithoutQuizOnly(!showWordsWithoutQuizOnly)
                  }
                />
                Show only words not included in any quiz
              </label>
              <button
                className="p-2 bg-blue-300 text-white"
                onClick={generateChallengesHandler}
                disabled={includedWordIds.length < minQuizQuestions}
              >
                Generate challenges
              </button>
            </div>
          </div>
          <div
            className={`absolute top-0 left-0 right-0 ${
              showChallengesTable ? "" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-start items-center border-b-[1px] border-dotted py-4 border-slate-300">
              <button
                className="p-2 bg-blue-300 text-white"
                onClick={() => setShowChallengesTable(false)}
              >
                Back
              </button>
            </div>
          </div>
          <div
            className={`transition ease-in-out duration-300 absolute top-28 left-0 right-0 bottom-0 ${
              showChallengesTable ? "-translate-x-full" : ""
            }`}
          >
            {vocabularyWords?.words.map((w) => (
              <div className="mt-2" key={w.id}>
                <input
                  type="checkbox"
                  checked={includedWordIds.includes(w.id)}
                  disabled={
                    includedWordIds?.length >= maxQuizQuestions &&
                    !includedWordIds.includes(w.id)
                  }
                  onChange={() => includeWordHandler(w)}
                />
                <span className="ml-2 text-sm">{w.word}</span>
              </div>
            ))}
          </div>
          <div
            className={`transition ease-in-out duration-300 absolute top-28 left-0 right-0 bottom-0 bg-red ${
              showChallengesTable ? "" : "translate-x-full"
            }`}
          >
            {data?.challenges.length ? <QuizQuestionsTable /> : <></>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewQuizEditable;
