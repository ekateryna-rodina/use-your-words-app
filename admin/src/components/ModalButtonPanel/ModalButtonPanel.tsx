import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setIsAutofill,
  setWordDetails,
} from "../../features/addNew/addnew-slice";
import { apiSlice } from "../../features/app-api-slice";
import { setEditMode } from "../../features/wordDetails/worddetails-slice";
import { Word } from "../../types";
import CloseIcon from "../icons/CloseIcon";
import EditIcon from "../icons/EditIcon";
import RandomIcon from "../icons/RandomIcon";
import SaveIcon from "../icons/SaveIcon";

type ModalButtonPanelProps = {
  isNew: boolean;
};
const ModalButtonPanel = ({ isNew }: ModalButtonPanelProps) => {
  const { isEdit } = useAppSelector((state) => state.wordDetails);
  const { word } = useAppSelector((state) => state.addNew);
  const [trigger, result, lastPromiseInfo] =
    apiSlice.endpoints.autofill.useLazyQuery();
  const dispatch = useAppDispatch();
  const editHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setEditMode(true));
  };
  const autofillHandler = async () => {
    dispatch(setIsAutofill(true));
    trigger(word, true);
  };
  useEffect(() => {
    if (!result.data) return;
    const autofillWord = result.data?.wordInfo as Word;
    dispatch(setWordDetails(autofillWord));
  }, [result]);
  return (
    <div className="absolute right-0 top-0 flex justify-start items-center gap-4">
      {isNew ? (
        <button
          className="bg-blue-700 w-8 h-8 flex justify-center items-center"
          onClick={autofillHandler}
        >
          <RandomIcon />
        </button>
      ) : (
        <></>
      )}
      {isEdit || isNew ? (
        <div className="relative w-8 h-8">
          <input
            type="submit"
            className="bg-emerald-300 w-full h-full"
            value=""
          />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
            <SaveIcon />
          </div>
        </div>
      ) : (
        // <SaveIcon />
        <button className="p-[2px]" onClick={editHandler}>
          <EditIcon />
        </button>
      )}

      <button>
        <CloseIcon />
      </button>
    </div>
  );
};

export default ModalButtonPanel;
