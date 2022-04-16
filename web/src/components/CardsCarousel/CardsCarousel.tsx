import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { BaseQuestion, QuestionType } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentChallengeIndex } from "../../features/practice/practice-slice";
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
  const {
    currentQuizChallenges,
    currentQuizChallengeIds,
    currentChallengeIndex,
  } = useAppSelector((state) => state.practice);

  const dispatch = useAppDispatch();
  let frontRef = useRef<HTMLDivElement | null>(null);
  let middleRef = useRef<HTMLDivElement | null>(null);
  let backRef = useRef<HTMLDivElement | null>(null);

  const [refsArray, setRefsArray] = useState<
    React.MutableRefObject<HTMLDivElement | null>[]
  >([frontRef, middleRef, backRef]);
  const initChallenges = (
    startIndex: number,
    endIndex: number
  ): (BaseQuestion & { __type: QuestionType })[] => {
    return Object.keys(currentQuizChallenges)
      .slice(startIndex, endIndex)
      .map((id) => currentQuizChallenges[id]);
  };
  const [challenges, setShallenges] = useState<
    (BaseQuestion & { __type: QuestionType })[]
  >(initChallenges(0, 3));
  console.log(challenges);

  const renderChallenge = (index: number): React.ReactNode => {
    if (index === null) return <></>;
    const currentChallenge =
      currentQuizChallenges[currentQuizChallengeIds[index]];
    console.log("curre", currentChallenge);
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

  // const updateStyles = () => {
  //   const frontTo = (ref: React.MutableRefObject<HTMLDivElement | null>, index: number) => {
  //     ref.current?.classList.add("next");
  //     setTimeout(() => {
  //       ref.current?.classList.add("back", "hidden");
  //       ref.current?.classList.remove("front", "next");
  //       ref.current?.classList.remove("hidden");
  //       const newChild = renderChallenge(index);
  //       const newChildNode = document.createElement(newChild);
  //       ref.current!.appendChild(newChildNode)
  //     }, 1000);
  //   };
  const updateStyles = () => {
    const frontTo = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
      const newChallengeIndex = 2;
      ref.current?.classList.add("next");
      const newChild = renderChallenge(newChallengeIndex);
      ReactDOM.createPortal(newChild, ref.current as HTMLDivElement);
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

  useEffect(() => {
    if (!isNext) return;
    updateStyles();
    dispatch(setCurrentChallengeIndex((currentChallengeIndex ?? 0) + 1));
    dispatch(setNext(false));
    dispatch(setAnswered(false));
    setRefsArray((oldArray) => {
      const newArray = [...oldArray];
      const first = newArray.shift();
      newArray.push(first as React.MutableRefObject<HTMLDivElement>);
      return newArray;
    });
    // eslint-disable-next-line
  }, [isNext]);
  useEffect(() => {
    setShallenges(
      initChallenges(
        currentChallengeIndex ?? 0,
        (currentChallengeIndex ?? 0) + 3
      )
    );
    console.log(currentChallengeIndex);
    //eslint-disable-next-line
  }, [currentChallengeIndex]);
  return (
    <div className="front-card-container">
      <div className="w-full h-full relative">
        <Card
          ref={frontRef}
          position={PracticeCardPosition.Front}
          frontCardRef={refsArray[0]}
          middleCardRed={refsArray[1]}
        >
          {/* {renderChallenge(0)} */}
        </Card>
        <Card
          ref={middleRef}
          position={PracticeCardPosition.Middle}
          frontCardRef={refsArray[0]}
          middleCardRed={refsArray[1]}
        >
          {/* {renderChallenge(1)} */}
        </Card>
        <Card
          ref={backRef}
          position={PracticeCardPosition.Back}
          frontCardRef={refsArray[0]}
          middleCardRed={refsArray[1]}
        >
          {/* {renderChallenge(2)} */}
        </Card>
      </div>
    </div>
  );
};

export default CardsCarousel;
