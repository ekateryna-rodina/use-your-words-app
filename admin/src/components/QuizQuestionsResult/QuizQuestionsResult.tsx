import { useEffect, useMemo } from "react";
import { BaseQuestion, QuestionType } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setChallenges,
  toggleSelectAllChallenges,
} from "../../features/addNewQuiz/addnewquiz-slice";
import {
  WithMedia,
  WithOptions,
  WithPair,
  WithQuestionInput,
} from "../QuzChallengeResults/";

const QuizQuestionsResult = () => {
  const { challenges, isSelectAllChallenges } = useAppSelector(
    (state) => state.addNewQuiz
  );
  const dispatch = useAppDispatch();
  const withOptionsChallenges: Record<
    string,
    (BaseQuestion & {
      __type: QuestionType;
      isSelected: boolean;
      word?: string | undefined;
    })[]
  > = useMemo(() => {
    return {
      "Choose word by definition": challenges.filter(
        (c) => c.__type === QuestionType.ChooseWordByMeaning
      ),
      "Choose definition by word": challenges.filter(
        (c) => c.__type === QuestionType.ChooseMeaningByWord
      ),
      "Choose synonym by word": challenges.filter(
        (c) => c.__type === QuestionType.ChooseSynonymByWord
      ),
      "Choose antonym by word": challenges.filter(
        (c) => c.__type === QuestionType.ChooseAntonymByWord
      ),
      "Choose word by synonym": challenges.filter(
        (c) => c.__type === QuestionType.ChooseWordBySynonym
      ),
      "Choose word by antonym": challenges.filter(
        (c) => c.__type === QuestionType.ChooseWordByAntonym
      ),
    };
  }, [challenges]);
  const withQuestionInputChallenges: Record<
    string,
    (BaseQuestion & {
      __type: QuestionType;
      isSelected: boolean;
      word?: string | undefined;
    })[]
  > = useMemo(() => {
    return {
      "Fill the gap": challenges.filter(
        (c) => c.__type === QuestionType.FillGap
      ),
      "Type word by the definition": challenges.filter(
        (c) => c.__type === QuestionType.TypeWordByMeaning
      ),
    };
  }, [challenges]);
  const withMediaChallenges: Record<
    string,
    (BaseQuestion & {
      __type: QuestionType;
      isSelected: boolean;
      word?: string | undefined;
    })[]
  > = useMemo(() => {
    return {
      "Pronunce the word out loud": challenges.filter(
        (c) => c.__type === QuestionType.Pronounce
      ),
      "Type what you heard": challenges.filter(
        (c) => c.__type === QuestionType.TypeWordByPronunciation
      ),
    };
  }, [challenges]);
  const selectAllChallengesHandler = () => {
    dispatch(toggleSelectAllChallenges());
  };
  useEffect(() => {
    if (!challenges) return;
    const newChallenges = challenges.map((c) => ({
      ...c,
      isSelected: isSelectAllChallenges,
    }));
    dispatch(setChallenges(newChallenges));
    // eslint-disable-next-line
  }, [isSelectAllChallenges]);
  return (
    <>
      <div className="my-2">
        <label>
          <input
            type="checkbox"
            className="mr-[15px]"
            checked={isSelectAllChallenges}
            onChange={selectAllChallengesHandler}
          />
          Select all
        </label>
      </div>
      {Object.keys(withQuestionInputChallenges).map((k) => (
        <WithQuestionInput
          key={k}
          title={k}
          challenges={withQuestionInputChallenges[k]}
        />
      ))}
      {Object.keys(withMediaChallenges).map((k) => (
        <WithMedia key={k} title={k} challenges={withMediaChallenges[k]} />
      ))}
      <WithPair />
      {Object.keys(withOptionsChallenges).map((k) => (
        <WithOptions key={k} title={k} challenges={withOptionsChallenges[k]} />
      ))}
    </>
  );
};

export default QuizQuestionsResult;
