import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setChallenges,
  setStep,
} from "../../features/addNewQuiz/addnewquiz-slice";
import { apiSlice } from "../../features/app-api-slice";
import { NewQuizFormSteps } from "../../types";

const NewQuizStepsPanel = () => {
  const [generateChallenges, { isLoading, data }] =
    apiSlice.endpoints.generateChallenges.useLazyQuery();
  const { includedWordIds, step, challenges } = useAppSelector(
    (state) => state.addNewQuiz
  );
  const dispatch = useAppDispatch();
  const generateChallengesHandler = (e: FormEvent) => {
    e.preventDefault();
    generateChallenges(includedWordIds);
  };

  const minQuizQuestions = 3;
  useEffect(() => {
    dispatch(
      setChallenges(
        data?.challenges.map((c) => ({ ...c, isSelected: true })) ?? []
      )
    );
    // eslint-disable-next-line
  }, [data]);
  useEffect(() => {
    if (challenges.length) dispatch(setStep(NewQuizFormSteps.Challenges));
    // eslint-disable-next-line
  }, [challenges]);
  return (
    <div className="absolute top-0 left-0 right-0 h-auto pb-8 border-b-[1px] border-dotted border-slate-300">
      {step === NewQuizFormSteps.Words && (
        <>
          <h2 className="quiz-challenges-header">Including Words</h2>
          <div className="flex xs:justify-between xs:items-center translate-y-1/8 md:translate-y-1/2 flex-col justify-center items-center gap-2 xs:flex-row">
            <label
              htmlFor="showWordsWithoutQuizOnly"
              className="text-xs md:text-sm"
            >
              <input
                type="checkbox"
                id="showWordsWithoutQuizOnly"
                checked={true}
                className="mr-2"
                onChange={() => null}
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
        </>
      )}
      {step === NewQuizFormSteps.Challenges && (
        <>
          <h2 className="quiz-challenges-header">Challenges</h2>
          <div className="flex xs:justify-between xs:items-center translate-y-1/8 md:translate-y-1/2 flex-col justify-center items-center gap-2 xs:flex-row">
            <button
              className="quiz-challenges-button"
              onClick={() => dispatch(setStep(NewQuizFormSteps.Words))}
            >
              Back
            </button>
            <button
              className="quiz-challenges-button"
              onClick={() => dispatch(setStep(NewQuizFormSteps.Tags))}
            >
              Apply tags
            </button>
          </div>
        </>
      )}
      {step === NewQuizFormSteps.Tags && (
        <>
          <h2 className="quiz-challenges-header">Apply Tags</h2>
          <div className="flex xs:justify-between xs:items-center translate-y-1/8 md:translate-y-1/2 flex-col justify-center items-center gap-2 xs:flex-row">
            <button
              className="quiz-challenges-button"
              onClick={() => dispatch(setStep(NewQuizFormSteps.Challenges))}
            >
              Back
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewQuizStepsPanel;
