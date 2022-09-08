import { useEffect, useState } from "react";
import { Quiz as QuizType } from "use-your-words-common";
import { useAppDispatch } from "../../app/hooks";
import { apiSlice, useDeleteQuizMutation } from "../../features/app-api-slice";
import { setCurrentQuiz } from "../../features/quizDetails/quizdetails-slice";
import DeleteIcon from "../icons/DeleteIcon";
import DetailsIcon from "../icons/DetailsIcon";

type QuizProps = {
  quizId: string;
};
const Quiz = ({ quizId }: QuizProps) => {
  const { data } = apiSlice.endpoints.fetchQuizzes.useQueryState();
  const [challengeWords, setChallengeWords] = useState([]);
  const dispatch = useAppDispatch();
  const [deleteQuiz] = useDeleteQuizMutation();
  const { name, challenges } = data?.filter(
    (q) => q.id === quizId
  )[0] as QuizType;
  //   Fetch words from cache
  const { data: words } = apiSlice.endpoints.fetchVocabulary.useQuery();
  const quizDetailsHandler = () => {
    dispatch(setCurrentQuiz(quizId));
  };
  const deleteQuizHandler = () => {
    deleteQuiz(quizId);
  };
  useEffect(() => {
    const wordIds = Array.from(new Set(challenges.map((c) => c.wordId)));
    const challengeWords = wordIds.map(
      (id) => words?.words.filter((w) => w.id === id)[0].word
    ) as [];
    setChallengeWords(challengeWords);
    // eslint-disable-next-line
  }, [challenges, name]);

  return (
    <div className="relative p-2 border border-slate-300 flex gap-4">
      <div className="pr-12">
        <h4 className="text-blue-300">{name}</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {challengeWords.map((w) => (
            <div key={w} className="p-2 text-sm bg-slate-100">
              {w}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bg-blue-300 top-0 right-0 bottom-0 w-12">
        <div className="h-full flex flex-col justify-center items-center gap-2">
          <button onClick={quizDetailsHandler}>
            <DetailsIcon />
          </button>
          <button onClick={deleteQuizHandler}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
