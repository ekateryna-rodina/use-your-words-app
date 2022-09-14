import { useEffect, useState } from "react";
import { Challenges, Quiz as QuizType } from "use-your-words-common";
import { useAppDispatch } from "../../app/hooks";
import { apiSlice, useDeleteQuizMutation } from "../../features/app-api-slice";
import { setCurrentQuiz } from "../../features/quizDetails/quizdetails-slice";
import DeleteIcon from "../icons/DeleteIcon";
import DetailsIcon from "../icons/DetailsIcon";
import QuizTag from "../QuizTag/QuizTag";

type QuizProps = {
  quizId: string;
  allowDelete: Function;
};
const Quiz = ({ quizId, allowDelete }: QuizProps) => {
  const { data } = apiSlice.endpoints.fetchQuizzes.useQuery();
  const [challengeWords, setChallengeWords] = useState([]);
  const dispatch = useAppDispatch();
  const [deleteQuiz] = useDeleteQuizMutation();
  const [quizDetails, setQuizDetails] = useState<{
    name: string;
    challenges: Challenges;
    tags: { id: string; name: string }[];
  } | null>(null);

  //   Fetch words from cache
  const { data: words } = apiSlice.endpoints.fetchVocabulary.useQuery();
  const quizDetailsHandler = () => {
    dispatch(setCurrentQuiz(quizId));
  };
  const deleteQuizHandler = async () => {
    const isOk = await allowDelete();
    if (!isOk) return;
    deleteQuiz(quizId);
  };
  useEffect(() => {
    const quizData = data?.filter((q) => q.id === quizId)[0] as QuizType;
    if (quizData && quizData.name && quizData.challenges) {
      setQuizDetails({
        name: quizData.name,
        challenges: quizData.challenges,
        tags: quizData.tags as { id: string; name: string }[],
      });
      return;
    }
    setQuizDetails(null);

    // eslint-disable-next-line
  }, [data]);
  useEffect(() => {
    if (!quizDetails) return;
    const wordIds = Array.from(
      new Set(quizDetails.challenges.map((c) => c.wordId))
    );
    const challengeWords = wordIds.map(
      (id) => words?.words.filter((w) => w.id === id)[0].word
    ) as [];
    setChallengeWords(challengeWords);
    // eslint-disable-next-line
  }, [quizDetails]);
  return (
    <div className="relative p-2 border border-slate-300 flex gap-4">
      <div className="pr-12">
        <h4 className="text-blue-300">{quizDetails?.name ?? ""}</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {challengeWords.map((w) => (
            <div key={w} className="p-2 text-sm bg-slate-100">
              {w}
            </div>
          ))}
        </div>
        <div className="border-t-[1px] border-dotted border-slate-300 flex gap-2 mt-2 py-2">
          {quizDetails?.tags.map(({ name }) => (
            <QuizTag key={name} {...{ name }} />
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
