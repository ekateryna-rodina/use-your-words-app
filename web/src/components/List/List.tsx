import React from "react";
import ListItem from "../ListItem.style";

type ListProps = {
  items: string[];
  title?: string;
  direction: "vertical" | "horizonal";
};
const List = ({ items, title, direction }: ListProps) => {
  const flexStyle = direction === "horizonal" ? "flex-row" : "flex-col";
  return (
    <div className="my-2">
      {title ? <h6 className="list-item-title">{title}</h6> : <></>}
      <div className={`flex ${flexStyle} my-4`}>
        {items.map((i) => (
          <ListItem key={i} item={i} />
        ))}
      </div>
    </div>
  );
};

export default List;
