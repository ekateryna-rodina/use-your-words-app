import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CardsCarousel } from "../components/CardsCarousel";
import { PracticeHeader } from "../components/PracticeHeader";
import { PracticeMenu } from "../components/PracticeMenu";

const Practice = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full relative bg-white dark:bg-dark-800">
        <PracticeHeader />
        <div className="card-deck-container">
          <CardsCarousel />
        </div>
        <PracticeMenu />
      </div>
    </DndProvider>
  );
};

export default Practice;
