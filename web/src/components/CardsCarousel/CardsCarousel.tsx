import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { QuestionType } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentChallengeIndex } from "../../features/practice/practice-slice";
import {
  setAnswered,
  setNext,
} from "../../features/practiceActions/practiceactions-slice";
import { PracticeCardPosition } from "../../types";
import Card from "../Card.style";
import ChooseMeaningByWord from "../Challenges/ChooseMeaningByWord";
import ConnectChallenge from "../Challenges/ConnectChallenge";
import FillGap from "../Challenges/FillGap";
import Pronounce from "../Challenges/Pronounce";
import SimpleMultiselectChallenge from "../Challenges/SimpleMultiselectChallenge";
import TypeWordByMeaning from "../Challenges/TypeWordByMeaning";
import TypeWordByPronunciation from "../Challenges/TypeWordByPronunciation";

type ChallengeProps = {
  currentChallengeIndex: number;
  parent: MutableRefObject<HTMLDivElement | null>;
};
const Challenge = React.memo(
  ({ currentChallengeIndex, parent }: ChallengeProps) => {
    const { currentQuizChallenges, currentQuizChallengeIds } = useAppSelector(
      (state) => state.practice
    );

    const renderChallenge = (
      index: number,
      parent: React.MutableRefObject<HTMLDivElement | null>
    ): React.ReactNode => {
      if (index === null || !parent?.current) {
        return <></>;
      }
      const currentChallengeId = currentQuizChallengeIds[index];
      const currentChallenge = currentQuizChallenges[currentChallengeId];
      const { __type, question, answer, options, transcription } =
        currentChallenge;

      switch (__type) {
        case QuestionType.FillGap:
          return (
            <FillGap
              phrase={question as string}
              answer={answer as string}
              challengeId={currentChallengeId}
            />
          );
        case QuestionType.Pronounce:
          return (
            <Pronounce
              fileUrl={question as string}
              challengeId={currentChallengeId}
              transcription={transcription as string}
              word={answer as string}
            />
          );
        case QuestionType.TypeWordByPronunciation:
          return (
            <TypeWordByPronunciation
              fileUrl={question as string}
              answer={answer as string}
              challengeId={currentChallengeId}
              transcription={transcription as string}
            />
          );
        case QuestionType.TypeWordByMeaning:
          return (
            <TypeWordByMeaning
              meaning={question as string}
              answer={answer as string}
              challengeId={currentChallengeId}
            />
          );
        case QuestionType.ChooseMeaningByWord:
          return (
            <ChooseMeaningByWord
              question={question as string}
              answer={answer as string}
              options={options as string[]}
              challengeId={currentChallengeId}
            />
          );
        case QuestionType.ChooseWordByMeaning:
          return (
            <SimpleMultiselectChallenge
              title={__type}
              question={question as string}
              answer={answer as string}
              options={options as string[]}
              challengeId={currentChallengeId}
            />
          );
        case QuestionType.ConnectWordsWithMeanings:
          return (
            <ConnectChallenge
              question={
                question as {
                  words: string[];
                  [k: string]: string[];
                }
              }
              challengeId={currentChallengeId}
              answer={answer as Record<string, string>}
            />
          );
        case QuestionType.ChooseSynonymByWord:
          return (
            <SimpleMultiselectChallenge
              title={__type}
              question={question as string}
              answer={answer as string}
              options={options as string[]}
              challengeId={currentChallengeId}
            />
          );
        case QuestionType.ChooseAntonymByWord:
          return (
            <SimpleMultiselectChallenge
              title={__type}
              question={question as string}
              answer={answer as string}
              options={options as string[]}
              challengeId={currentChallengeId}
            />
          );
        case QuestionType.ChooseWordBySynonym:
          return (
            <SimpleMultiselectChallenge
              title={__type}
              question={question as string}
              answer={answer as string}
              options={options as string[]}
              challengeId={currentChallengeId}
            />
          );
        case QuestionType.ChooseWordByAntonym:
          return (
            <SimpleMultiselectChallenge
              title={__type}
              question={question as string}
              answer={answer as string}
              options={options as string[]}
              challengeId={currentChallengeId}
            />
          );
        default:
          return <></>;
      }
    };
    return <>{renderChallenge(currentChallengeIndex, parent)}</>;
  }
);
export interface PortalProps {
  target: Element;
  children: React.ReactNode;
}

const CardsCarousel = () => {
  const { isNext, isSkip } = useAppSelector((state) => state.practiceActions);
  const {
    currentQuizChallenges,
    currentQuizChallengeIds,
    currentChallengeIndex,
  } = useAppSelector((state) => state.practice);
  const dispatch = useAppDispatch();
  let frontRef = useRef<HTMLDivElement | null>(null);
  let middleRef = useRef<HTMLDivElement | null>(null);
  let backRef = useRef<HTMLDivElement | null>(null);
  const [swapBack, setSwapBack] =
    useState<React.MutableRefObject<HTMLDivElement> | null>(null);
  const [refsArray, setRefsArray] = useState<
    React.MutableRefObject<HTMLDivElement | null>[]
  >([frontRef, middleRef, backRef]);

  const [init, setInit] = useState<boolean>(false);
  const [refIndexData, setRefIndexData] = useState<WeakMap<
    React.MutableRefObject<HTMLDivElement>,
    number
  > | null>(null);
  let timer: ReturnType<typeof setTimeout>;
  const updateStyles = () => {
    const frontTo = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
      const nextChallengeIndex = (currentChallengeIndex ?? 0) + 2;
      ref.current?.classList.add("next");

      if (nextChallengeIndex < currentQuizChallengeIds.length - 1) {
        timer = setTimeout(() => {
          setSwapBack(ref as React.MutableRefObject<HTMLDivElement>);
          ref.current?.classList.add("back", "hidden");
          ref.current?.classList.remove("front", "next");
          ref.current?.classList.remove("hidden");
        }, 700);
      }
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
    if (!swapBack) return;
    const nextChallengeIndex = (currentChallengeIndex ?? 0) + 2;
    if (nextChallengeIndex >= currentQuizChallengeIds.length) return;
    setRefIndexData((oldState) => {
      oldState?.set(
        swapBack as React.MutableRefObject<HTMLDivElement>,
        nextChallengeIndex
      );
      return oldState;
    });
    setSwapBack(null);
    // eslint-disable-next-line
  }, [swapBack]);
  useEffect(() => {
    if (!refIndexData) return;
    setInit(true);
  }, [refIndexData]);
  useEffect(() => {
    if (!frontRef && !middleRef && !backRef) return;
    const initRefIndexData = new WeakMap();
    initRefIndexData.set(frontRef, 0);
    initRefIndexData.set(middleRef, 1);
    initRefIndexData.set(backRef, 2);
    setRefIndexData(initRefIndexData);
  }, [frontRef, middleRef, backRef]);
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
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    // eslint-disable-next-line
  }, []);
  const getIndexByRef = (ref: React.MutableRefObject<HTMLDivElement>) => {
    return refIndexData?.get(ref) ?? 0;
  };
  const renderChallenge = (ref: React.MutableRefObject<HTMLDivElement>) => {
    return (
      <Challenge
        currentChallengeIndex={getIndexByRef(
          ref as MutableRefObject<HTMLDivElement>
        )}
        parent={ref as MutableRefObject<HTMLDivElement>}
      />
    );
  };
  return (
    <div className="front-card-container">
      <div className="w-full h-full relative">
        <Card
          ref={frontRef as React.MutableRefObject<HTMLDivElement>}
          position={PracticeCardPosition.Front}
        >
          {init ? (
            renderChallenge(frontRef as MutableRefObject<HTMLDivElement>)
          ) : (
            <></>
          )}
        </Card>
        <Card
          ref={middleRef as React.MutableRefObject<HTMLDivElement>}
          position={PracticeCardPosition.Middle}
        >
          {init ? (
            renderChallenge(middleRef as MutableRefObject<HTMLDivElement>)
          ) : (
            <></>
          )}
        </Card>
        <Card
          ref={backRef as React.MutableRefObject<HTMLDivElement>}
          position={PracticeCardPosition.Back}
        >
          {init ? (
            renderChallenge(backRef as MutableRefObject<HTMLDivElement>)
          ) : (
            <></>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CardsCarousel;
