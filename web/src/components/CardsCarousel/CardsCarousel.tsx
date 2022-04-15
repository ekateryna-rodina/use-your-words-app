import React, { useEffect, useRef, useState } from "react";
import { QuestionType } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentChallenge } from "../../features/practice/practice-slice";
import {
  setAnswered,
  setNext,
} from "../../features/practiceActions/practiceactions-slice";
import { PracticeCardPosition } from "../../types";
import Card from "../Card.style";

const CardsCarousel = () => {
  const { isNext, isSkip, isHint } = useAppSelector(
    (state) => state.practiceActions
  );
  const { currentChallengeId, currentQuizChallenges } = useAppSelector(
    (state) => state.practice
  );

  const dispatch = useAppDispatch();
  let frontRef = useRef<HTMLDivElement | null>(null);
  let middleRef = useRef<HTMLDivElement | null>(null);
  let backRef = useRef<HTMLDivElement | null>(null);

  const [refsArray, setRefsArray] = useState<
    React.MutableRefObject<HTMLDivElement | null>[]
  >([frontRef, middleRef, backRef]);

  const getNextChallenge = () => {
    const newChallengeId = Object.keys(currentQuizChallenges).reduce(
      (acc, challengeId, i) => {
        if (challengeId === currentChallengeId) {
          acc = Object.keys(currentQuizChallenges)[i + 1];
          return acc;
        }
        return acc;
      },
      ""
    );
    console.log("consch", newChallengeId);
    return newChallengeId;
  };

  const updateStyles = () => {
    const frontTo = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
      ref.current?.classList.add("next");
      setTimeout(() => {
        ref.current?.classList.add("back", "hidden");
        ref.current?.classList.remove("front", "next");
        ref.current?.classList.remove("hidden");
      }, 1000);
    };
    const middleTo = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
      ref.current?.classList.add("front");
      ref.current?.classList.remove("middle");
    };
    const backTo = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
      ref.current?.classList.add("middle");
      ref.current?.classList.remove("back");
    };

    frontTo(refsArray[0]);
    middleTo(refsArray[1]);
    backTo(refsArray[2]);
  };

  const renderChallenge = () => {
    if (!currentChallengeId) return;
    const currentChallenge = currentQuizChallenges[currentChallengeId];
    const { __type, question } = currentChallenge;

    switch (__type) {
      case QuestionType.FillGap:
        return <span>{question}</span>;
      case QuestionType.Pronounce:
        return <span>{question}</span>;
      case QuestionType.TypeWordByPronunciation:
        return <span>{question}</span>;
      case QuestionType.TypeWordByMeaning:
        return <span>{question}</span>;
      case QuestionType.ChooseMeaningByWord:
        return <span>{question}</span>;
      case QuestionType.ChooseWordByMeaning:
        return <span>{question}</span>;
      case QuestionType.ConnectWordsWithMeanings:
        return <span>{question}</span>;
      case QuestionType.ChooseSynonymByWord:
        return <span>{question}</span>;
      case QuestionType.ChooseAntonymByWord:
        return <span>{question}</span>;
      case QuestionType.ChooseWordBySynonym:
        return <span>{question}</span>;
      case QuestionType.ChooseWordByAntonym:
        return <span>{question}</span>;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    if (!isNext) return;
    console.log("next");
    updateStyles();
    dispatch(setNext(false));
    dispatch(setAnswered(false));
    const nextChallenge = getNextChallenge();
    dispatch(setCurrentChallenge(nextChallenge));
    console.log(refsArray);
    setRefsArray((oldArray) => {
      const newArray = [...oldArray];
      const first = newArray.shift();
      newArray.push(first as React.MutableRefObject<HTMLDivElement>);

      console.log(newArray);
      return newArray;
    });
    // eslint-disable-next-line
  }, [isNext]);
  return (
    <div className="front-card-container">
      <div className="w-full h-full relative">
        <Card ref={frontRef} position={PracticeCardPosition.Front}>
          {renderChallenge()}
        </Card>
        <Card ref={middleRef} position={PracticeCardPosition.Middle}>
          {renderChallenge()}
        </Card>
        <Card ref={backRef} position={PracticeCardPosition.Back}>
          {renderChallenge()}
        </Card>
      </div>
    </div>
  );
};

export default CardsCarousel;
