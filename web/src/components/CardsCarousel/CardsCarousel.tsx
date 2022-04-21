import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
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

const Challenge: React.FC<PortalProps> = (props) => {
  return ReactDOM.createPortal(props.children, props.target);
};

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

  const [refsArray, setRefsArray] = useState<
    React.MutableRefObject<HTMLDivElement | null>[]
  >([frontRef, middleRef, backRef]);

  const [challengeIdx, setChallengeIdx] = useState<number[]>([0, 1, 2]);

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

  const updateStyles = () => {
    const frontTo = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
      ref.current?.classList.add("next");
      const nextChallengeIndex = (currentChallengeIndex ?? 0) + 3;
      if (nextChallengeIndex < currentQuizChallengeIds.length) {
        setTimeout(() => {
          ref.current?.classList.add("back", "hidden");
          ref.current?.classList.remove("front", "next");
          ref.current?.classList.remove("hidden");
          ref.current?.removeChild(ref.current?.children[0]);
          const newChallengeNode = renderChallenge(
            nextChallengeIndex,
            ref as React.MutableRefObject<HTMLDivElement>
          );

          ReactDOM.render(
            <Challenge
              target={ref.current as Element}
              children={newChallengeNode}
            />,
            ref.current
          );
        }, 1000);
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
    setChallengeIdx((oldIdx) => {
      const newIdx = [...oldIdx];
      return newIdx;
    });

    //eslint-disable-next-line
  }, [currentChallengeIndex]);

  return (
    <div className="front-card-container">
      <div className="w-full h-full relative">
        <Card ref={frontRef} position={PracticeCardPosition.Front}>
          {renderChallenge(
            0,
            frontRef as MutableRefObject<HTMLDivElement | null>
          )}
        </Card>
        <Card ref={middleRef} position={PracticeCardPosition.Middle}>
          {renderChallenge(
            1,
            middleRef as MutableRefObject<HTMLDivElement | null>
          )}
        </Card>
        <Card ref={backRef} position={PracticeCardPosition.Back}>
          {renderChallenge(
            2,
            backRef as MutableRefObject<HTMLDivElement | null>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CardsCarousel;
