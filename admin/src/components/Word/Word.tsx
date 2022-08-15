import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useDeleteWordMutation } from "../../features/app-api-slice";
import { toggleModal } from "../../features/modal/modal-slice";
import { setCurrentWordId } from "../../features/wordDetails/worddetails-slice";
import { WordWithId } from "../../types";
import DeleteIcon from "../icons/DeleteIcon";
import DetailsIcon from "../icons/DetailsIcon";

type WordProps = {
  index: number;
  word: WordWithId;
  words: WordWithId[];
  letter: string;
  expanded: string[];
  setExpanded: (expanded: string[]) => void;
  allowDelete: Function;
};

const Word = ({
  index,
  word,
  words,
  letter,
  expanded,
  setExpanded,
  allowDelete,
}: WordProps) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [deleteWord] = useDeleteWordMutation();
  const dispatch = useAppDispatch();
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>, id: string) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe) {
      if (isLeftSwipe) {
        setExpanded([...expanded, id]);
      }
      if (isRightSwipe) {
        setExpanded(expanded.filter((e) => e !== id));
      }
    }
  };
  const detailsHandler = () => {
    dispatch(setCurrentWordId(word.id));
    dispatch(toggleModal(true));
  };

  const deleteHandler = async () => {
    const isOk = await allowDelete();
    if (!isOk) return;
    deleteWord(word.id);
  };

  return (
    <div
      className={`relative border border-slate-300 p-4 overflow-hidden sm:w-[18rem] ${
        index !==
        words.filter((w) => w.word[0].toLowerCase() === letter.toLowerCase())
          .length -
          1
          ? "border-b-0"
          : ""
      } sm:border-b-1`}
      key={word.id}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={(e) => onTouchEnd(e, word.id)}
    >
      <span>{word.word}</span>
      {/* media xs */}
      <div
        className={`transition-transform bg-blue-300 absolute top-0 bottom-0 right-0 ${
          !expanded.includes(word.id) ? "translate-x-full" : ""
        }`}
      >
        <div className="flex flex-row justify-center items-center gap-[3px] h-full">
          <button className="p-4" onClick={detailsHandler}>
            <DetailsIcon />
          </button>
          <button className="p-4" onClick={deleteHandler}>
            <DeleteIcon />
          </button>
        </div>
      </div>
      {/* media sm+ */}
      <div
        className={`hidden bg-blue-300 absolute top-0 bottom-0 right-0 sm:block`}
      >
        <div className="flex flex-row justify-center items-center gap-[3px] h-full">
          <button className="p-4" onClick={detailsHandler}>
            <DetailsIcon />
          </button>
          <button className="p-4" onClick={deleteHandler}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Word;
