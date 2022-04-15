import React from "react";
import { CardsCarousel } from "../components/CardsCarousel";
import { PracticeHeader } from "../components/PracticeHeader";
import { PracticeMenu } from "../components/PracticeMenu";

const Practice = () => {
  return (
    <div className="h-full relative bg-white dark:bg-dark-800">
      <PracticeHeader />
      <div className="card-deck-container">
        <CardsCarousel />
      </div>
      <PracticeMenu />
    </div>
  );
};

export default Practice;
