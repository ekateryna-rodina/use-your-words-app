import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { ConfirmationWindow } from "../components/ConfirmationWindow";
import AddIcon from "../components/icons/AddIcon";
import { SearchVocabulary } from "../components/SearchVocabulary";
import Words from "../components/Words/Words";
import {
  setIsNew,
  setPartsOfSpeech,
} from "../features/addNewWord/addnewword-slice";
import { useFetchPartsOfSpeechQuery } from "../features/app-api-slice";
import { toggleConfirm } from "../features/confirm/confirm-slice";
import { setActiveTab } from "../features/tabs/tabs-slice";
import { useDeferredPromise } from "../hooks/useDeferredPromise";

const Vocabulary = () => {
  const dispatch = useAppDispatch();
  const { defer, deferRef } = useDeferredPromise<boolean>();

  const apiPartsOfSpeechResponse = useFetchPartsOfSpeechQuery();

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
    dispatch(setPartsOfSpeech(apiPartsOfSpeechResponse.data ?? []));
    //eslint-disable-next-line
  }, [apiPartsOfSpeechResponse]);

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
      <ConfirmationWindow onConfirm={handleConfirm} onCancel={handleClose} />
    </>
  );
};

export default Vocabulary;
