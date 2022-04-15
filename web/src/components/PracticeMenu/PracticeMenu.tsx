import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setAnswered,
  setNext,
} from "../../features/practiceActions/practiceactions-slice";
import RectangleButton from "../RectangleButton.style";

const PracticeMenu = () => {
  const dispatch = useAppDispatch();
  const { isAnswered } = useAppSelector((state) => state.practiceActions);
  const { currentQuizChallenges, currentChallengeId } = useAppSelector(
    (state) => state.practice
  );

  const nextHandler = () => {
    dispatch(setNext(true));
  };
  const answerHandler = () => {
    dispatch(setAnswered(true));
  };
  return (
    <div className="practice-menu px-4 flex justify-start items-center">
      <RectangleButton handler={() => null} isPrimary={false}>
        <span className="practice-button-value">Skip</span>
      </RectangleButton>
      <RectangleButton handler={() => null} isPrimary={false}>
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
