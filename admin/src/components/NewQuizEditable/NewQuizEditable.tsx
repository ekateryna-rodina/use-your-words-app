import { FormEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { WordWithId } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  reset as resetStore,
  setIncludedWordIds,
  setName,
} from "../../features/addNewQuiz/addnewquiz-slice";
import { apiSlice, useAddNewQuizMutation } from "../../features/app-api-slice";
import { useFormErrors } from "../../hooks/useFormErrors";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { addQuizSchema } from "../../schema/addQuizSchema";
import { NewQuizFormSteps } from "../../types";
import { FormErrors } from "../FormErrors";
import CloseIcon from "../icons/CloseIcon";
import SaveIcon from "../icons/SaveIcon";
import { NewQuizStepsPanel } from "../NewQuizStepsPanel";
import { QuizChallengesResult } from "../QuizChallengesResult";
import { QuizTags } from "../QuizTags";

const NewQuizEditable = () => {
  const maxQuizQuestions = 7;
  const { isLoading } = useAppSelector((state) => state.loading);
  const [challengeErrors, setChallengeErrors] = useState<string[]>([]);
  const { includedWordIds, step, challenges, isNew } = useAppSelector(
    (state) => state.addNewQuiz
  );
  const resolver = useYupValidationResolver(addQuizSchema);
  const dispatch = useAppDispatch();
  const [
    generateChallenges,
    { data, isError, isLoading: challengeGenerationLoading },
  ] = apiSlice.endpoints.generateChallenges.useLazyQuery();
  const [saveNewQuiz] = useAddNewQuizMutation();
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

  useEffect(() => {
    resetField("name");
    // eslint-disable-next-line
  }, [isNew]);
  const errorsHeight = useFormErrors(
    [
      ...Object.values(errors).map((e) => (e as any).message),
      ...challengeErrors,
    ],
    errorsRef
  );
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
          <NewQuizStepsPanel />
          <div
            className={`transition ease-in-out duration-300 absolute top-32 md:top-28 left-0 right-0 bottom-0 ${
              step === NewQuizFormSteps.Challenges ||
              step === NewQuizFormSteps.Tags
                ? "-translate-x-full"
                : ""
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
              step === NewQuizFormSteps.Challenges ? "" : "translate-x-full"
            }`}
          >
            <QuizChallengesResult />
          </div>
          <div
            className={`transition ease-in-out duration-300 absolute top-28 left-0 right-0 bottom-0 ${
              step === NewQuizFormSteps.Tags ? "" : "translate-x-full"
            }`}
          >
            <QuizTags />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewQuizEditable;
