import { useAppSelector } from "../../app/hooks";
import CloseIcon from "../icons/CloseIcon";
import EditIcon from "../icons/EditIcon";

const ModalButtonPanel = () => {
  const { isEdit } = useAppSelector((state) => state.wordDetails);
  const editHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <div className="absolute right-0 top-0 flex justify-start items-center gap-4">
      {isEdit ? (
        <input
          type="submit"
          className="bg-emerald-300 p-[2px]"
          value="ss"
        ></input>
      ) : (
        // <SaveIcon />
        <button className="bg-blue-300 p-[2px]" onClick={editHandler}>
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
