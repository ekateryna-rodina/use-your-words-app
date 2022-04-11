import React from "react";

type ListItemProps = {
  item: string;
};
const ListItem = ({ item }: ListItemProps) => {
  return (
    <div className="my-2">
      <div className="inline border-l-2 border-green mr-2 ml-4"></div>
      <span className="list-item-content">{item}</span>
    </div>
  );
};

export default ListItem;
