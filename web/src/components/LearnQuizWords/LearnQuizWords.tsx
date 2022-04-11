import React, { useEffect, useState } from "react";
import { WordWithId } from "use-your-words-common";
import { useAppSelector } from "../../app/hooks";
import { Quiz } from "../../types";
import { WordsAccordion } from "../WordsAccordion";

const LearnQuizWords = () => {
  const quizzesState = useAppSelector((state) => state.quizzes);
  const { learnCurrentId } = quizzesState;
  const [items, setItems] = useState<WordWithId[]>();

  useEffect(() => {
    if (!learnCurrentId) return;
    const learnQuizInfo = quizzesState.quizzes.filter(
      (q) => q.quizId === learnCurrentId
    )[0] as Quiz;
    const items = Object.values(learnQuizInfo?.words) as WordWithId[];
    setItems(items);
    // eslint-disable-next-line
  }, [learnCurrentId]);
  return learnCurrentId && items?.length ? (
    <div>
      <WordsAccordion items={items} />
    </div>
  ) : (
    <></>
  );
};

export default LearnQuizWords;
