import React from "react";
import { PracticeHeader } from "../components/PracticeHeader";
import { PracticeMenu } from "../components/PracticeMenu";

const Practice = () => {
  return (
    <div className="h-full relative bg-white dark:bg-dark-800">
      <PracticeHeader />

      <div></div>

      <PracticeMenu />
    </div>
  );
};

export default Practice;
