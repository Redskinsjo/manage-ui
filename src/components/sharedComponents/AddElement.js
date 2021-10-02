import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalState, GlobalDispatch } from "../../redux/GlobalProvider";

export default function AddElement({ unit }) {
  const { ui } = useContext(GlobalState);
  const { addDish, addTable } = ui;
  const { displayAddTable, displayAddDish } = useContext(GlobalDispatch);
  return (
    <div
      className="max-w-full h-8 mb-4 mt-8 py-4 cursor-pointer border-2 border-gray-500 hover:bg-yellow-300 hover:border-black flex justify-center items-center"
      onClick={(e) => {
        e.stopPropagation();
        if (unit === "table") displayAddTable(!addTable);
        if (unit === "dish") displayAddDish(!addDish);
      }}
    >
      {(addTable && unit === "table") || (addDish && unit === "dish") ? (
        <FontAwesomeIcon icon={["fas", "minus"]}></FontAwesomeIcon>
      ) : (
        <FontAwesomeIcon icon={["fas", "plus"]}></FontAwesomeIcon>
      )}
    </div>
  );
}
