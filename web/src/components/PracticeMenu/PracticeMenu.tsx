import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setAnswered,
  setHint,
  setHintIsAvailable,
  setNext,
} from "../../features/practiceActions/practiceactions-slice";
import RectangleButton from "../RectangleButton.style";

const PracticeMenu = () => {
  const dispatch = useAppDispatch();
  const { isAnswered, isHintAvailable } = useAppSelector(
    (state) => state.practiceActions
  );

  const nextHandler = () => {
    dispatch(setNext(true));
    dispatch(setHintIsAvailable(true));
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
