import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { reset as resetNewQuiz } from "../../features/addNewQuiz/addnewquiz-slice";
import { reset as resetNewWord } from "../../features/addNewWord/addnewword-slice";
import { useFetchVocabularyQuery } from "../../features/app-api-slice";
import { reset as resetExistingWord } from "../../features/wordDetails/worddetails-slice";
import { ExistingWordEditable } from "../ExistingWordEditable";
import CloseIcon from "../icons/CloseIcon";
import { NewQuizEditable } from "../NewQuizEditable";
import { NewWordEditable } from "../NewWordEditable";

const Layout: React.FC = ({ children }) => {
  const { activeTab } = useAppSelector((state) => state.tabs);
  const { data, isLoading } = useFetchVocabularyQuery();
  const dispatch = useAppDispatch();
  const closeModalHandler = () => {
    dispatch(resetNewWord());
    dispatch(resetExistingWord());
    dispatch(resetNewQuiz());
  };
  const { isNew: isNewWord } = useAppSelector((state) => state.addNewWord);
  const { isNew: isNewQuiz } = useAppSelector((state) => state.addNewQuiz);
  const { currentWordId } = useAppSelector((state) => state.wordDetails);
  const renderModalContent = () => {
    if (currentWordId) return <ExistingWordEditable />;
    else if (isNewWord) return <NewWordEditable />;
    return <NewQuizEditable />;
  };
  return (
    <div className="w-[85%] h-full mx-auto my-4">
      <h2 className="text-lg">Admin panel</h2>
      <ul className="flex flex-row gap-4 mt-[2px]">
        <li>
          <Link
            className={`text-slate-300 ${
              activeTab === "vocabulary" ? "bordered-tab" : ""
            }`}
            to="/vocabulary"
          >
            Vocabulary
          </Link>

          {isLoading ? (
            <div className="loading ml-[3px]">1</div>
          ) : (
            <div className="count-label">{data?.words.length}</div>
          )}
        </li>
        <li>
          <Link
            className={`text-slate-300 ${
              activeTab === "quizzes" ? "bordered-tab" : ""
            }`}
            to="/quizzes"
          >
            Quizzes
          </Link>
        </li>
      </ul>
      <main className="mt-8 h-full">
        {children}
        <div
          className={`absolute inset-0 transition bg-slate-100 ${
            !currentWordId && !isNewWord && !isNewQuiz ? "translate-y-full" : ""
          }`}
        >
          <div className="relative w-full h-full">
            {renderModalContent()}
            <button
              className="absolute right-4 top-4 translate-y-[calc(50%-.5rem)]"
              onClick={closeModalHandler}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Layout;
