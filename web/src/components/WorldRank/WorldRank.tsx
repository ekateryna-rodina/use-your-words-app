import React from "react";
import RankIcon from "../icons/RankIcon";

type WordRankProps = {
  rank: number;
};
const WorldRank = ({ rank }: WordRankProps) => {
  return (
    <div className="icon-with-score-container">
      <RankIcon fill={"fill-green"} />
      <span>{`#${rank}`}</span>
    </div>
  );
};

export default WorldRank;
