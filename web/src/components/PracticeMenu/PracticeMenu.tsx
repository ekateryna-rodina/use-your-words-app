import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setAnswered,
  setAnsweredResult,
  setHint,
  setNext,
} from "../../features/practiceActions/practiceactions-slice";
import { ChallengeResults } from "../../types";
import FailureIcon from "../icons/FailureIcon";
import SuccessIcon from "../icons/SuccessIcon";
import RectangleButton from "../RectangleButton.style";

const PracticeMenu = () => {
  const dispatch = useAppDispatch();
  const { isAnswered, isHintAvailable, result, correctAnswer } = useAppSelector(
    (state) => state.practiceActions
  );

  const nextHandler = () => {
    dispatch(
      setAnsweredResult({
        result: ChallengeResults.None,
      })
    );
    dispatch(setNext(true));
  };
  const answerHandler = () => {
    dispatch(setAnswered(true));
  };
  const hintHandler = () => {
    if (!isHintAvailable) return;
    dispatch(setHint(true));
  };
  return (
    <div className="practice-menu px-4 flex justify-start items-center">
      {result === ChallengeResults.None || !isAnswered ? (
        <>
          <RectangleButton handler={() => null} isPrimary={false}>
            <span className="practice-button-value">Skip</span>
          </RectangleButton>
          <RectangleButton
            handler={hintHandler}
            isPrimary={false}
            isDisabled={!isHintAvailable}
          >
            <span className="practice-button-value">Hint</span>
          </RectangleButton>
        </>
      ) : result === ChallengeResults.Success ? (
        <div className="flex flex-row justify-center items-center">
          <SuccessIcon />
          <span className="ml-2 p-2 text-gray-300 dark:text-dark-500">
            Correct!
          </span>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center">
          <FailureIcon />
          <div className="ml-2 px-2 flex flex-col justify-center items-start">
            <span className="text-gray-300 dark:text-dark-500">
              Correct answer
            </span>
            <span>{correctAnswer}</span>
          </div>
        </div>
      )}
      <div className="ml-auto">
        {isAnswered ? (
          <RectangleButton handler={nextHandler} isPrimary={true}>
            <span className="practice-button-value">Next</span>
          </RectangleButton>
        ) : (
          <RectangleButton handler={answerHandler} isPrimary={true}>
            <span className="practice-button-value">Check</span>
          </RectangleButton>
        )}
      </div>
    </div>
  );
};

export default PracticeMenu;
