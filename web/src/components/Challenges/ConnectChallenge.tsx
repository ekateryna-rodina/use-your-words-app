import React, { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { QuestionType } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  reset,
  setAnswered,
  setUnanswered,
} from "../../features/challengednd/challengednd-slice";
import { ChallengeTitles } from "../../types";

type ConnectChallengeType = {
  question: {
    words: string[];
    [k: string]: string[];
  };
  answer: Record<string, string>;
};
type DraggableProps = {
  word: string;
};
type DroppableProps = {
  meaning: string;
  unanswered: string[];
};
const DropTypes = {
  WORD: "word",
};

const Draggable = ({ word }: DraggableProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    item: {
      word,
    },
    type: DropTypes.WORD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`rounded-sm py-1 px-2 bg-gray-200 text-dark-700 dark:text-light dark:bg-dark-500 ${
        isDragging
          ? "bg-purple opacity-30 text-white cursor-grabbing"
          : "cursor-grab"
      }`}
    >
      {word}
    </div>
  );
};

const Droppable = ({ meaning }: DroppableProps) => {
  const { answered, unanswered } = useAppSelector(
    (state) => state.challengednd
  );
  const dispatch = useAppDispatch();
  // const canAcceptAnswer = () => !Object.values(answered).includes(meaning);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DropTypes.WORD,
      drop: (item: { word: string }, monitor) => acceptAnswer(item.word),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  function acceptAnswer(dragWord: string) {
    if (!dragWord) return;
    dispatch(setAnswered({ word: dragWord, answer: meaning }));
  }
  const renderDropArea = (isOver: boolean) => {
    const matchingWord = Object.keys(answered).reduce(
      (acc: string | null, curr) => {
        if (answered[curr] === meaning) {
          acc = curr;
          return acc;
        }
        return acc;
      },
      null
    );
    const overStyle = isOver ? "border-dotted border-purple" : "";
    if (matchingWord) {
      return (
        <div className={`droparea bg-purple text-light ${overStyle}`}>
          {matchingWord}
        </div>
      );
    } else {
      return (
        <div className={`droparea bg-gray-200 dark:bg-dark-500 ${overStyle}`}>
          Drop a word here
        </div>
      );
    }
  };
  return (
    <div className="border border-dotted border-gray-300 rounded-sm py-1 px-2 bg-transparent text-sm text-dark-700 dark:text-light dark:border-dark-500">
      {meaning}
      <div ref={drop}>{renderDropArea(isOver)}</div>
    </div>
  );
};
const ConnectChallenge = ({ question, answer }: ConnectChallengeType) => {
  const dispatch = useAppDispatch();
  const { unanswered } = useAppSelector((state) => state.challengednd);
  const resetHandler = () => {
    dispatch(reset(question.words));
  };
  useEffect(() => {
    dispatch(setUnanswered(question.words));
    // eslint-disable-next-line
  }, []);
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[QuestionType.ConnectWordsWithMeanings]}</h2>
        <div className="challenge__question">
          <div className="flex flex-row justify-start items-center flex-wrap gap-2">
            {unanswered.map((w, index) => (
              <Draggable key={w} word={w} />
            ))}
            {!unanswered.length ? (
              <button
                className="rounded-sm py-1 px-2 bg-gray-200 text-dark-700 dark:text-light dark:bg-dark-500"
                onClick={resetHandler}
              >
                Reset
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col justify-start items-center gap-2 mt-2 pr-2 max-h-[18rem] overflow-y-auto">
            {question.meanings.map((m) => (
              <Droppable key={m} meaning={m} unanswered={unanswered} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectChallenge;
