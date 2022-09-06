import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import AddIcon from "../components/icons/AddIcon";
import { QuizList } from "../components/QuizList";
import { SearchQuizWords } from "../components/SearchQuizWords";
import { setIsNew } from "../features/addNewQuiz/addnewquiz-slice";
import { useGetQuizzesQuery } from "../features/app-api-slice";
import { setActiveTab } from "../features/tabs/tabs-slice";

const Quizzes = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetQuizzesQuery();
  useEffect(() => {
    dispatch(setActiveTab("quizzes"));
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="flex justify-start items-center">
        <SearchQuizWords />
        <button
          onClick={() => dispatch(setIsNew(true))}
          className="w-8 h-8 bg-blue-300 ml-[6px] flex justify-center items-center"
        >
          <AddIcon />
        </button>
      </div>
      <QuizList />
    </>
  );
};

export default Quizzes;

// create quiz
// -- in out quiz name
// -- select words
// -- generate questions
// -- can remove questions
// -- save quiz

{
  /* {modal.show ? (
        <AddEditWord word={currentWord} tempParts={partsOfSpeech} />
      ) : (
        <></>
      )}
      {showCreateQuizModal ? (
        <CreateQuiz
          words={words?.filter((w) => quizQuestions.includes(w.id)) ?? []}
        />
      ) : (
        <></>
      )} */
}
{
  /* md:w-1/2 md:right-0 md:left-1/2 */
}

// const [quizQuestions, setQuizQuestions] = useState<string[]>([]);
// const toggleQuizList = (wordId: string) => {
//   if (quizQuestions.includes(wordId)) {
//     const newQuizQuestions = quizQuestions.filter((q) => q !== wordId);
//     setQuizQuestions(newQuizQuestions);
//   } else {
//     setQuizQuestions([...quizQuestions, wordId]);
//   }
// };
