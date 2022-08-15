import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setEditMode } from "../../features/wordDetails/worddetails-slice";
import CloseIcon from "../icons/CloseIcon";
import EditIcon from "../icons/EditIcon";
import RandomIcon from "../icons/RandomIcon";
import SaveIcon from "../icons/SaveIcon";

type ModalButtonPanelProps = {
  isNew: boolean;
};
const ModalButtonPanel = ({ isNew }: ModalButtonPanelProps) => {
  const { isEdit } = useAppSelector((state) => state.wordDetails);
  const dispatch = useAppDispatch();
  const editHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setEditMode(true));
  };
  return (
    <div className="absolute right-0 top-0 flex justify-start items-center gap-4">
      {isNew ? (
        <button className="bg-blue-700 w-8 h-8 flex justify-center items-center">
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
