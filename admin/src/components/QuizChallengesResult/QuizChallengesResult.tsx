import { useEffect, useMemo } from "react";
import { QuestionType } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setChallenges,
  toggleSelectAllChallenges,
} from "../../features/addNewQuiz/addnewquiz-slice";
import { Challenges } from "../../types";
import {
  WithMedia,
  WithOptions,
  WithPair,
  WithQuestionInput,
} from "../QuzChallengeResultsByTypes";

const QuizChallengesResult = () => {
  const { challenges, isSelectAllChallenges } = useAppSelector(
    (state) => state.addNewQuiz
  );
  const dispatch = useAppDispatch();
  const withOptionsChallenges: Record<string, Challenges> = useMemo(() => {
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
  const withQuestionInputChallenges: Record<string, Challenges> =
    useMemo(() => {
      return {
        "Fill the gap": challenges.filter(
          (c) => c.__type === QuestionType.FillGap
        ),
        "Type word by the definition": challenges.filter(
          (c) => c.__type === QuestionType.TypeWordByMeaning
        ),
      };
    }, [challenges]);
  const withMediaChallenges: Record<string, Challenges> = useMemo(() => {
    return {
      "Pronunce the word out loud": challenges.filter(
        (c) => c.__type === QuestionType.Pronounce
      ),
      "Type what you heard": challenges.filter(
        (c) => c.__type === QuestionType.TypeWordByPronunciation
      ),
    };
  }, [challenges]);
  const withPairChallenges: Record<string, Challenges> = useMemo(() => {
    return {
      "Connect word with its definition": challenges.filter(
        (c) => c.__type === QuestionType.ConnectWordsWithMeanings
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
          isEditable={true}
        />
      ))}
      {Object.keys(withMediaChallenges).map((k) => (
        <WithMedia
          key={k}
          title={k}
          challenges={withMediaChallenges[k]}
          isEditable={true}
        />
      ))}
      {Object.keys(withPairChallenges).map((k) => (
        <WithPair
          key={k}
          title={k}
          challenges={withPairChallenges[k]}
          isEditable={true}
        />
      ))}

      {Object.keys(withOptionsChallenges).map((k) => (
        <WithOptions
          key={k}
          title={k}
          challenges={withOptionsChallenges[k]}
          isEditable={true}
        />
      ))}
    </>
  );
};

export default QuizChallengesResult;
