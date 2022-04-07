import React from "react";
import HeartIcon from "../icons/HeartIcon";

type StakeLevelProps = {
  stake: number;
};
const StakeLevel = ({ stake }: StakeLevelProps) => {
  return (
    <div className="icon-with-score-container">
      <HeartIcon fill={"fill-red"} />
      <span>{stake}</span>
    </div>
  );
};

export default StakeLevel;
