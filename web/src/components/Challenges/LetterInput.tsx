import React, { useEffect, useRef, useState } from "react";

type LetterInputProps = {
  answer: string;
};
type LetterProps = {
  index: number;
  focusedIndex: number;
  setFocusedIdx: (index: any) => void;
  setUserAnswer: (answer: string[]) => void;
  userAnswer: string[];
};
const Letter = ({
  index,
  focusedIndex,
  setFocusedIdx,
  setUserAnswer,
  userAnswer,
}: LetterProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [backSpace, left, right] = ["Backspace", "ArrowLeft", "ArrowRight"];
  const focusHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === backSpace || e.code === left || e.code === right) return;
    setFocusedIdx(focusedIndex + 1);
  };
  const backLeftRightHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (focusedIndex === 0) return;

    if (e.code === left) {
      setFocusedIdx(focusedIndex - 1);
      return;
    }

    if (e.code === right) {
      if (focusedIndex === userAnswer.length - 1) return;
      setFocusedIdx(focusedIndex + 1);
      return;
    }

    if (backSpace === e.code) {
      // focus to previous input
      setFocusedIdx(focusedIndex - 1);
    }
  };
  useEffect(() => {
    if (index === focusedIndex) {
      ref.current?.focus();
    }
  }, [index, focusedIndex, ref]);
  return (
    <div className="relative w-[2rem] h-[2rem] bg-gray-200 dark:bg-dark-700">
      <input
        type="text"
        className="absolute inset-0 text-center focus:border-green dark:focus:border-green"
        onChange={(e) => {
          const value = e.currentTarget.value;
          const newState = [...userAnswer];
          newState[index] = value;
          setUserAnswer(newState);
        }}
        value={userAnswer[index]}
        onKeyUp={focusHandler}
        onKeyDown={backLeftRightHandler}
        maxLength={1}
        ref={ref}
      />
    </div>
  );
};

const LetterInput = ({ answer }: LetterInputProps) => {
  const [focusedLetterIdx, setFocusedIdx] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string[]>(
    answer.split("").map((l) => "")
  );
  return (
    <form className="flex justify-center items-center gap-2 flex-wrap">
      {answer.split("").map((l, i) => (
        <Letter
          key={l + i}
          index={i}
          focusedIndex={focusedLetterIdx}
          setFocusedIdx={setFocusedIdx}
          setUserAnswer={setUserAnswer}
          userAnswer={userAnswer}
        />
      ))}
    </form>
  );
};

export default LetterInput;
