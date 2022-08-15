import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { AddEdit } from "../components/AddEdit";
import { ConfirmationWindow } from "../components/ConfirmationWindow";
import AddIcon from "../components/icons/AddIcon";
import { SearchVocabulary } from "../components/SearchVocabulary";
import Words from "../components/Words/Words";
import { setIsNew } from "../features/addNew/addnew-slice";
import { useFetchPartsOfSpeechQuery } from "../features/app-api-slice";
import { toggleConfirm } from "../features/confirm/confirm-slice";
import { setActiveTab } from "../features/tabs/tabs-slice";
import { useDeferredPromise } from "../hooks/useDeferredPromise";
import { PartOfSpeech } from "../types/";

const Vocabulary = () => {
  const [partsOfSpeech, setPartsOfSpeech] = useState<PartOfSpeech[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { defer, deferRef } = useDeferredPromise<boolean>();
  const { currentWordId } = useAppSelector((state) => state.wordDetails);
  const apiPartsOfSpeechResponse = useFetchPartsOfSpeechQuery();
  const { isNew } = useAppSelector((state) => state.addNew);
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
  useEffect(() => {
    dispatch(setActiveTab("vocabulary"));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (apiPartsOfSpeechResponse.isLoading) return;
    setPartsOfSpeech(apiPartsOfSpeechResponse.data ?? []);
  }, [apiPartsOfSpeechResponse]);

  const toggleQuizList = (wordId: string) => {
    if (quizQuestions.includes(wordId)) {
      const newQuizQuestions = quizQuestions.filter((q) => q !== wordId);
      setQuizQuestions(newQuizQuestions);
    } else {
      setQuizQuestions([...quizQuestions, wordId]);
    }
  };

  return (
    <>
      <div className="flex justify-start items-center">
        <SearchVocabulary />
        <button
          onClick={() => dispatch(setIsNew(true))}
          className="w-8 h-8 bg-blue-300 ml-[6px] flex justify-center items-center"
        >
          <AddIcon />
        </button>
      </div>

      <Words allowDelete={allowDelete} />
      {/* {modal.show ? (
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
      )} */}
      <div
        className={`absolute inset-0 transition bg-slate-100 p-4 ${
          !currentWordId && !isNew ? "translate-y-full" : ""
        }`}
      >
        <AddEdit partsOfSpeech={partsOfSpeech} />
      </div>
      <ConfirmationWindow onConfirm={handleConfirm} onCancel={handleClose} />
    </>
  );
};

export default Vocabulary;
