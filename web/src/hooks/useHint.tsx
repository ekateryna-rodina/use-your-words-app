import { useEffect, useState } from "react";
import { QuestionType } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setHint,
  setHintIsAvailable,
} from "../features/practiceActions/practiceactions-slice";
import { getDisabledOptions, getValueWithHint } from "../utils/challenges";

export function useHint<
  P extends {
    challengeId: string;
    answer?: string;
    options?: string[];
    value?: string;
    transcription?: string;
  }
>(props: P, type: QuestionType) {
  const { isHint } = useAppSelector((state) => state.practiceActions);
  const { currentChallengeIndex, currentQuizChallengeIds } = useAppSelector(
    (state) => state.practice
  );
  const [hintData, setHintData] = useState<string[] | string | null>(null);
  const [isCurrent, setIsCurrent] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const resetHint = () => {
    dispatch(setHintIsAvailable(true));
    dispatch(setHint(false));
  };

  function getHintData() {
    if (!isHint || !isCurrent) return null;
    switch (type) {
      case QuestionType.ChooseMeaningByWord:
        return getDisabledOptions(
          props.answer as string,
          props.options as string[]
        );
      case QuestionType.FillGap:
      case QuestionType.TypeWordByPronunciation:
        return getValueWithHint(props.answer as string, props.value as string);
      case QuestionType.Pronounce:
        return props.transcription;
      default:
        return null;
    }
  }
  useEffect(() => {
    const isCurrent =
      currentChallengeIndex !== null &&
      props.challengeId === currentQuizChallengeIds[currentChallengeIndex];
    setIsCurrent(isCurrent);
  }, [currentChallengeIndex, props.challengeId, currentQuizChallengeIds]);
  useEffect(() => {
    if (!isCurrent) {
      return;
    }
    resetHint(); // set isHint available/set is hint to false
    // eslint-disable-next-line
  }, [isCurrent]);
  // reset hint is avilable on every new challange
  useEffect(() => {
    if (!isHint) {
      setHintData(null);
      return;
    }
    const isCurrent =
      currentChallengeIndex !== null &&
      props.challengeId === currentQuizChallengeIds[currentChallengeIndex];
    if (isCurrent && isHint) {
      const hintData = getHintData();
      if (!hintData) return;
      setHintData(hintData);
      dispatch(setHintIsAvailable(false));
    }
    // eslint-disable-next-line
  }, [isHint]);
  return isCurrent ? hintData : null;
}
