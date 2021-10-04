import React, { useContext } from "react";
import TableUnit from "../secondary/TableUnit";
import { GlobalState } from "../../redux/GlobalProvider";

export default function Tables() {
  const {
    data: { tables },
  } = useContext(GlobalState);
  return (
    <div className="flex flex-col items-center overflow-y-scroll overflow-hidden bg-gray-100 flex-grow">
      {tables &&
        tables.map((table) => {
          return (
            <TableUnit
              key={table._id}
              id={table._id}
              numero={table.numero}
              seats={table.seats}
              indoor={table.indoor}
              outdoor={table.outdoor}
            />
          );
        })}
    </div>
  );
}
