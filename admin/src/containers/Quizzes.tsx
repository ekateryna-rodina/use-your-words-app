import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { ConfirmationWindow } from "../components/ConfirmationWindow";
import AddIcon from "../components/icons/AddIcon";
import { QuizList } from "../components/QuizList";
import { SearchQuizWords } from "../components/SearchQuizWords";
import { setIsNew } from "../features/addNewQuiz/addnewquiz-slice";
import { toggleConfirm } from "../features/confirm/confirm-slice";
import { setActiveTab } from "../features/tabs/tabs-slice";
import { useDeferredPromise } from "../hooks/useDeferredPromise";

const Quizzes = () => {
  const dispatch = useAppDispatch();
  const { defer, deferRef } = useDeferredPromise<boolean>();
  useEffect(() => {
    dispatch(setActiveTab("quizzes"));
    // eslint-disable-next-line
  }, []);
  const handleConfirm = () => {
    dispatch(toggleConfirm(false));
    deferRef.current?.resolve(true);
  };
  const allowDelete = async () => {
    dispatch(toggleConfirm(true));
    return defer().promise;
  };
  const handleClose = () => {
    dispatch(toggleConfirm(false));
    deferRef.current?.resolve(false);
  };
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
      <QuizList allowDelete={allowDelete} />
      <ConfirmationWindow onConfirm={handleConfirm} onCancel={handleClose} />
    </>
  );
};

export default Quizzes;
