import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { FormValue, WordWithId } from "../../types";
import { Collapsible } from "../Collapsible";
import CloseIcon from "../icons/CloseIcon";
import EditIcon from "../icons/EditIcon";
import ListenIcon from "../icons/ListenIcon";
import SaveIcon from "../icons/SaveIcon";

const WordDetails = () => {
  const { isEdit, currentWord } = useAppSelector((state) => state.wordDetails);
  const { id, word, partOfSpeech, meanings, phrases, synonyms, antonyms } =
    currentWord as WordWithId;
  const [expanded, setExpanded] = useState<string[]>([]);
  return (
    <div className="w-full h-full relative">
      <div className="flex justify-start items-center gap-4 my-0 ">
        <span className="text-2xl font-bold">
          {word[0].toUpperCase() + word.slice(1)}
        </span>
        <button>
          <ListenIcon />
        </button>
      </div>
      <div className="bordered-paragraph mt-4">
        {partOfSpeech.map((p) => (p as FormValue).value).join(", ")}
      </div>
      <Collapsible
        title="Phrases"
        items={(phrases as FormValue[]).slice(0, 4)}
        {...{ expanded, setExpanded }}
      />
      <Collapsible
        title="Definitions"
        items={meanings as FormValue[]}
        {...{ expanded, setExpanded }}
      />
      {/* <Collapsible
        title="Synonyms"
        items={synonyms as FormValue[]}
        {...{ expanded, setExpanded }}
      />
      <Collapsible
        title="Antonyms"
        items={antonyms as FormValue[]}
        {...{ expanded, setExpanded }}
      /> */}
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
    </div>
  );
};

export default WordDetails;
