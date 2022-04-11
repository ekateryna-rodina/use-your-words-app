import React from "react";
import { WordWithId } from "use-your-words-common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggle } from "../../features/modal/modal-slice";
import { Button } from "../Button";
import CloseIcon from "../icons/CloseIcon";
import { WordsAccordion } from "../WordsAccordion";

const Modal: React.FC = (children) => {
  const { isOpen } = useAppSelector((state) => state.modal);
  const { isDark } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const translate = isOpen ? "" : "translate-y-full";
  const bg = isDark ? "bg-dark-800" : "bg-white";
  const closeModalHandler = () => {
    dispatch(toggle(false));
  };
  const test: WordWithId[] = [
    {
      id: "1",
      word: "hello",
      fileUrl: "file",
      meanings: [
        { id: "1", value: "mean1" },
        { id: "2", value: "mean2" },
      ],
      partOfSpeech: [{ id: "1", value: "adjec" }],
      phrases: [
        { id: "1", value: "11" },
        { id: "2", value: "22" },
      ],

      synonyms: [
        { id: "1", value: "11" },
        { id: "2", value: "22" },
      ],
      antonyms: [
        { id: "1", value: "11" },
        { id: "2", value: "22" },
      ],
    },
    {
      id: "2",
      word: "helloy",
      fileUrl: "file",
      meanings: [
        { id: "1", value: "mean1" },
        { id: "2", value: "mean2" },
      ],
      partOfSpeech: [
        { id: "1", value: "adjec" },
        { id: "2", value: "noun" },
      ],
      phrases: [
        { id: "1", value: "11er" },
        { id: "2", value: "22errr" },
      ],

      synonyms: [
        { id: "1", value: "11ere" },
        { id: "2", value: "22wf" },
      ],
      antonyms: [
        { id: "1", value: "11dfs" },
        { id: "2", value: "22efwe" },
      ],
    },
  ];
  return (
    <div
      className={`absolute inset-0 bg-white ease-in-out duration-300 ${translate}`}
    >
      <div className={`relative h-full p-2 ${bg}`}>
        <Button handler={closeModalHandler} className="absolute right-4 top-4">
          <CloseIcon fill={isDark ? "fill-dark-500" : "fill-gray-300"} />
        </Button>
        <div className="w-11/12 my-2">
          <WordsAccordion items={test} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
