import React, { useContext } from "react";
import TableUnit from "../secondary/TableUnit";
import { GlobalTables } from "../../App";

export default function Tables({ refetch }) {
  const tables = useContext(GlobalTables);
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
              refetch={refetch}
            />
          );
        })}
    </div>
  );
}
