import { useMemo } from "react";
import { QuestionType } from "use-your-words-common";
import { useAppSelector } from "../../app/hooks";
import { apiSlice } from "../../features/app-api-slice";
import { Challenges } from "../../types";
import { isEqualType } from "../../utils/apiTransform";
import {
  WithMedia,
  WithOptions,
  WithPair,
  WithQuestionInput,
} from "../QuzChallengeResultsByTypes";

const ExistingQuizDetails = () => {
  const { currentQuizId } = useAppSelector((state) => state.quizDetails);
  const quizzes = apiSlice.endpoints.fetchQuizzes.useQueryState();
  const quizDetails = quizzes?.data?.filter((q) => q.id === currentQuizId)[0];
  const challenges = quizDetails?.challenges as Challenges;
  const withOptionsChallenges: Record<string, Challenges> = useMemo(() => {
    return {
      "Choose word by definition": challenges.filter((c) =>
        isEqualType(c.__type, QuestionType.ChooseWordByMeaning)
      ),
      "Choose definition by word": challenges.filter((c) =>
        isEqualType(c.__type, QuestionType.ChooseMeaningByWord)
      ),
      "Choose synonym by word": challenges.filter((c) =>
        isEqualType(c.__type, QuestionType.ChooseSynonymByWord)
      ),
      "Choose antonym by word": challenges.filter((c) =>
        isEqualType(c.__type, QuestionType.ChooseAntonymByWord)
      ),
      "Choose word by synonym": challenges.filter((c) =>
        isEqualType(c.__type, QuestionType.ChooseWordBySynonym)
      ),
      "Choose word by antonym": challenges.filter((c) =>
        isEqualType(c.__type, QuestionType.ChooseWordByAntonym)
      ),
    };
  }, [challenges]);
  const withQuestionInputChallenges: Record<string, Challenges> =
    useMemo(() => {
      return {
        "Fill the gap": challenges.filter((c) =>
          isEqualType(c.__type, QuestionType.FillGap)
        ),
        "Type word by the definition": challenges.filter((c) =>
          isEqualType(c.__type, QuestionType.TypeWordByMeaning)
        ),
      };
    }, [challenges]);
  const withMediaChallenges: Record<string, Challenges> = useMemo(() => {
    return {
      "Pronunce the word out loud": challenges.filter((c) =>
        isEqualType(c.__type, QuestionType.Pronounce)
      ),
      "Type what you heard": challenges.filter((c) =>
        isEqualType(c.__type, QuestionType.TypeWordByPronunciation)
      ),
    };
  }, [challenges]);
  const withPairChallenges: Record<string, Challenges> = useMemo(() => {
    return {
      "Connect word with its definition": challenges.filter((c) =>
        isEqualType(c.__type, QuestionType.ConnectWordsWithMeanings)
      ),
    };
  }, [challenges]);
  return (
    <div className="modal-container">
      <span className="text-lg text-blue-300 uppercase font-bold">
        {quizDetails?.name}
      </span>
      <div className="overflow-y-auto max-h-[85vh] mt-8">
        {Object.keys(withQuestionInputChallenges).map((k) => (
          <WithQuestionInput
            key={k}
            title={k}
            challenges={withQuestionInputChallenges[k]}
            isEditable={false}
          />
        ))}
        {Object.keys(withMediaChallenges).map((k) => (
          <WithMedia
            key={k}
            title={k}
            challenges={withMediaChallenges[k]}
            isEditable={false}
          />
        ))}
        {Object.keys(withPairChallenges).map((k) => (
          <WithPair
            key={k}
            title={k}
            challenges={withPairChallenges[k]}
            isEditable={false}
          />
        ))}

        {Object.keys(withOptionsChallenges).map((k) => (
          <WithOptions
            key={k}
            title={k}
            challenges={withOptionsChallenges[k]}
            isEditable={false}
          />
        ))}
      </div>
    </div>
  );
};

export default ExistingQuizDetails;
