import { FormEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { WordWithId } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  reset as resetStore,
  setChallenges,
  setIncludedWordIds,
  setName,
  setShowChallengesResult,
} from "../../features/addNewQuiz/addnewquiz-slice";
import { apiSlice, useAddNewQuizMutation } from "../../features/app-api-slice";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { addQuizSchema } from "../../schema/addQuizSchema";
import { FormErrors } from "../FormErrors";
import CloseIcon from "../icons/CloseIcon";
import SaveIcon from "../icons/SaveIcon";
import { QuizChallengesResult } from "../QuizChallengesResult";

const NewQuizEditable = () => {
  const [minQuizQuestions, maxQuizQuestions] = [3, 7];
  const { isLoading } = useAppSelector((state) => state.loading);
  const [challengeErrors, setChallengeErrors] = useState<string[]>([]);
  const {
    includedWordIds,
    isShowChallengesResult: showChallengesResult,
    challenges,
    isNew,
  } = useAppSelector((state) => state.addNewQuiz);
  const resolver = useYupValidationResolver(addQuizSchema);
  const [errorsHeight, setErrorsHeight] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [
    generateChallenges,
    { data, isError, isLoading: challengeGenerationLoading },
  ] = apiSlice.endpoints.generateChallenges.useLazyQuery();
  const [saveNewQuiz] = useAddNewQuizMutation();
  const [showWordsWithoutQuizOnly, setShowWordsWithoutQuizOnly] =
    useState<boolean>(false);
  const errorsRef = useRef<HTMLDivElement>(null);
  const { data: vocabularyWords } =
    apiSlice.endpoints.fetchVocabulary.useQueryState();
  const {
    handleSubmit,
    register,
    resetField,
    formState: { errors },
  } = useForm<any>({ resolver });
  const onSaveQuizHandler = (values: any) => {
    if (!challenges.length) {
      setChallengeErrors(["create challenges for this quiz"]);
      return;
    }
    saveNewQuiz({ name: values.name, challenges });
    dispatch(resetStore());
  };
  const onNewQuizNameEnterHandler = (name: string) => {
    dispatch(setName(name));
  };
  const reseQuizNameHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setName(""));
    resetField("name");
  };
  useEffect(() => {
    if (!Object.keys(errors).length) return;
    const errorsHeight = errorsRef.current?.clientHeight;
    setErrorsHeight(errorsHeight ?? 0);
  }, [errors]);
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
  const generateChallengesHandler = (e: FormEvent) => {
    e.preventDefault();
    generateChallenges(includedWordIds);
  };
  useEffect(() => {
    if (data?.challenges.length) {
      dispatch(
        setChallenges(data.challenges.map((c) => ({ ...c, isSelected: true })))
      );
      dispatch(setShowChallengesResult(true));
    }
    // eslint-disable-next-line
  }, [data]);
  useEffect(() => {
    resetField("name");
    // eslint-disable-next-line
  }, [isNew]);
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
              className="w-full placeholder:text-xs md:placeholder:text-sm"
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
          <FormErrors
            errors={[
              ...Object.values(errors).map((e) => (e as any).message),
              ...challengeErrors,
            ]}
            height={errorsHeight}
            ref={errorsRef}
          />
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
          <div className="absolute top-0 left-0 right-0 h-auto pb-8 border-b-[1px] border-dotted border-slate-300">
            {!showChallengesResult && (
              <h2 className="quiz-challenges-header">Including Words</h2>
            )}
            {!showChallengesResult && (
              <div className="flex xs:justify-between xs:items-center translate-y-1/8 md:translate-y-1/2 flex-col justify-center items-center gap-2 xs:flex-row">
                <label
                  htmlFor="showWordsWithoutQuizOnly"
                  className="text-xs md:text-sm"
                >
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
                  className="quiz-challenges-button sm:ml-4"
                  onClick={generateChallengesHandler}
                  disabled={includedWordIds.length < minQuizQuestions}
                >
                  Generate challenges
                </button>
              </div>
            )}
            {showChallengesResult && (
              <h2 className="quiz-challenges-header">Challenges</h2>
            )}
            {showChallengesResult && (
              <div className="flex justify-start items-center translate-y-1/2">
                <button
                  className="quiz-challenges-button"
                  onClick={() => dispatch(setShowChallengesResult(false))}
                >
                  Back
                </button>
              </div>
            )}
          </div>
          <div
            className={`transition ease-in-out duration-300 absolute top-32 md:top-28 left-0 right-0 bottom-0 ${
              showChallengesResult ? "-translate-x-full" : ""
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
            className={`transition ease-in-out duration-300 absolute top-28 left-0 right-0 bottom-0 ${
              showChallengesResult ? "" : "translate-x-full"
            }`}
          >
            {data?.challenges.length && showChallengesResult ? (
              <QuizChallengesResult />
            ) : (
              <></>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewQuizEditable;
