import { useAppSelector } from "../../app/hooks";
import { apiSlice } from "../../features/app-api-slice";

const QuizQuestionsTable = () => {
  const { includedWordIds } = useAppSelector((state) => state.addNewQuiz);
  const data = apiSlice.endpoints.generateChallenges.useQuery(includedWordIds);
  console.log(data);
  return <div>QuizQuestionsTable</div>;
};

export default QuizQuestionsTable;
