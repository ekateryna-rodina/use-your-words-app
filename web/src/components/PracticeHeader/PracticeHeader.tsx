import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Button } from "../Button";
import CloseIcon from "../icons/CloseIcon";
import { ProgressBar } from "../ProgressBar";

const PracticeHeader = () => {
  const { isDark } = useAppSelector((state) => state.theme);
  const closePracticeHandler = () => {
    // how confirm window
  };
  return (
    <div className="header px-4 gap-4">
      <Button handler={closePracticeHandler}>
        <CloseIcon fill={isDark ? "fill-dark-500" : "fill-gray-300"} />
      </Button>

      <ProgressBar progress={32} title="Quiz progress" />
      <ProgressBar progress={78} title="Daily progress" />
    </div>
  );
};

export default PracticeHeader;
