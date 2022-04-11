import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggle } from "../../features/modal/modal-slice";
import { Accordion } from "../Accordion";
import { Button } from "../Button";
import CloseIcon from "../icons/CloseIcon";

const Modal: React.FC = (children) => {
  const { isOpen } = useAppSelector((state) => state.modal);
  const { isDark } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const translate = isOpen ? "" : "translate-y-full";
  const bg = isDark ? "bg-dark-800" : "bg-white";
  const closeModalHandler = () => {
    dispatch(toggle(false));
  };
  return (
    <div
      className={`absolute inset-0 bg-white ease-in-out duration-300 ${translate}`}
    >
      <div className={`relative h-full p-2 ${bg}`}>
        <Button handler={closeModalHandler} className="absolute right-4 top-4">
          <CloseIcon fill={isDark ? "fill-dark-500" : "fill-gray-300"} />
        </Button>
        <Accordion />
      </div>
    </div>
  );
};

export default Modal;
