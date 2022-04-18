import React from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
} from "react-beautiful-dnd";
import ReactDOM from "react-dom";
import { QuestionType } from "use-your-words-common";
import { ChallengeTitles } from "../../types";

type ConnectChallengeType = {
  question: {
    words: string[];
    [k: string]: string[];
  };
  answer: Record<string, string>;
};
type DraggableWordProps = {
  word: string;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
};
const DraggableWord = ({ word, provided, snapshot }: DraggableWordProps) => {
  let portal = document.createElement("div");
  document.body.appendChild(portal);
  const usePortal: boolean = snapshot.isDragging;
  const child = (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="rounded-sm py-1 px-2 bg-gray-200 text-dark-700 dark:text-light dark:bg-dark-500"
    >
      {word}
    </div>
  );
  if (!usePortal) {
    return child;
  }
  return ReactDOM.createPortal(child, portal);
};
const ConnectChallenge = ({ question, answer }: ConnectChallengeType) => {
  return (
    <div className="challenge">
      <div className="container">
        <h2>{ChallengeTitles[QuestionType.ConnectWordsWithMeanings]}</h2>
        <div className="challenge__question">
          <DragDropContext onDragEnd={(e) => console.log(e)}>
            <Droppable droppableId="meaning">
              {(provided) => (
                <div>
                  <div className="flex flex-row justify-start items-center flex-wrap gap-2">
                    {question.words.map((w, index) => (
                      <Draggable key={w} draggableId={w} index={index}>
                        {(provided, snapshot) => {
                          return (
                            <DraggableWord
                              word={w}
                              provided={provided}
                              snapshot={snapshot}
                            />
                          );
                        }}
                      </Draggable>
                    ))}
                  </div>

                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col justify-start items-center gap-2 mt-2 pr-2 max-h-[18rem] overflow-y-auto"
                  >
                    {question.meanings.map((w) => (
                      <div
                        key={w}
                        className="border border-dotted border-gray-300 rounded-sm py-1 px-2 bg-transparent text-sm text-dark-700 dark:text-light dark:border-dark-500"
                      >
                        {w}
                        <div className="w-11/12 m-auto my-2 py-1 px-2 text-center rounded-sm bg-gray-200 dark:bg-dark-500">
                          Drop answer here
                        </div>
                      </div>
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default ConnectChallenge;
