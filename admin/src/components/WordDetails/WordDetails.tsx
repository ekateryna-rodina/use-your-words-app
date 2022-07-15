import { useAppSelector } from "../../app/hooks";
import { WordWithId } from "../../types";
import { Editable } from "../Editable";
import ListenIcon from "../icons/ListenIcon";

const WordDetails = () => {
  const { currentWord } = useAppSelector((state) => state.wordDetails);
  const { word } = currentWord as WordWithId;

  return (
    <div className="relative">
      <div className="h-12">
        {/*  */}
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
