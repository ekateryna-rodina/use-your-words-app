import React from "react";

type BackForwardNavigationProps = {
  currentIdx: number;
  setCurrentIdx: (index: number) => void;
  challengeId: string;
};
const BackForwardNavigation = React.memo(
  ({ currentIdx, setCurrentIdx, challengeId }: BackForwardNavigationProps) => {
    let optionsLen = 4;
    const flexButtons = `${
      currentIdx > 0 && currentIdx < optionsLen - 1
        ? "justify-between"
        : currentIdx > 0
        ? "justify-start"
        : "justify-end"
    }`;

    return (
      <div className="absolute bottom-1/4 left-0 right-0 ">
        <div
          className={`w-11/12 mx-auto px-4 flex flex-row ${flexButtons} items-center`}
        >
          {currentIdx > 0 ? (
            <button
              className="multiselect__button"
              onClick={() => setCurrentIdx(currentIdx - 1)}
            >
              Previous
            </button>
          ) : (
            <></>
          )}
          {currentIdx < optionsLen - 1 ? (
            <button
              className="multiselect__button"
              onClick={() => setCurrentIdx(currentIdx + 1)}
            >
              Next
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
);

export default BackForwardNavigation;
