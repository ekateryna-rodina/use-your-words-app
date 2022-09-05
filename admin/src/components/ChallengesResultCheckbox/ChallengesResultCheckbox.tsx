import { QuestionType } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleSelection } from "../../features/addNewQuiz/addnewquiz-slice";

type ChallengesResultCheckboxProps = {
  wordId: string;
  type: QuestionType;
};
const ChallengesResultCheckbox = ({
  wordId,
  type,
}: ChallengesResultCheckboxProps) => {
  const { challenges } = useAppSelector((state) => state.addNewQuiz);
  const dispatch = useAppDispatch();
  const includeChallengeHandler = () => {
    dispatch(toggleSelection({ wordId, type }));
  };
  return (
    <div>
      <input
        type="checkbox"
        checked={
          challenges.filter((c) => c.wordId === wordId && type === c.__type)[0]
            .isSelected
        }
        onChange={includeChallengeHandler}
      />
    </div>
  );
};

export default ChallengesResultCheckbox;
