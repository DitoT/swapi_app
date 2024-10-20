import React from "react";
import DataDetails from "./DataDetails";

const DataItem = ({ item, type }) => {
  return (
    <li>
      <h3>{item.name}</h3>
      <DataDetails url={item.url} type={type} />
    </li>
  );
};

export default DataItem;
