import { useAppSelector } from "../../app/hooks";
import { WordWithId } from "../../types";
import { Editable } from "../Editable";
import CloseIcon from "../icons/CloseIcon";
import EditIcon from "../icons/EditIcon";
import ListenIcon from "../icons/ListenIcon";
import SaveIcon from "../icons/SaveIcon";

const WordDetails = () => {
  const { isEdit, currentWord } = useAppSelector((state) => state.wordDetails);
  const { word } = currentWord as WordWithId;

  return (
    <div>
      <div className="h-12 relative">
        <div className="absolute right-0 top-0 flex justify-start items-center gap-4">
          {isEdit ? (
            <button>
              <SaveIcon />
            </button>
          ) : (
            <button>
              <EditIcon />
            </button>
          )}
          <button>
            <CloseIcon />
          </button>
        </div>
        <div className="absolute top-0 left-0 flex justify-start items-center gap-4 my-0 ">
          <span className="text-2xl font-bold">
            {word[0].toUpperCase() + word.slice(1)}
          </span>
          <button>
            <ListenIcon />
          </button>
        </div>
      </div>
      <Editable />
    </div>
  );
};

export default WordDetails;
