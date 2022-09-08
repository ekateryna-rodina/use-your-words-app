import { MouseEventHandler } from "react";
import RandomIcon from "../icons/RandomIcon";

type AutofillButtonProps = {
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
};
const AutofillButton = ({ onClickHandler, isLoading }: AutofillButtonProps) => {
  return (
    <button
      className={`relative btn generate ${
        isLoading ? "pointer-events-none" : ""
      }`}
      onClick={onClickHandler}
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex justify-center items-center">
        {isLoading ? <div className="loading"></div> : <RandomIcon />}
      </div>
    </button>
  );
};

export default AutofillButton;
