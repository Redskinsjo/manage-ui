import React, { useRef, useContext } from "react";
import Tables from "../components/primary/Tables";
import AddElement from "../components/sharedComponents/AddElement";
import TableDetails from "../components/primary/TableDetails";
import { GlobalState, GlobalDispatch } from "../redux/GlobalProvider";
import Language from "../components/sharedComponents/Language";

export default function Level2() {
  const tableElemref = useRef();
  const { ui, data } = useContext(GlobalState);
  const { tableDetails } = ui;
  const { refetch } = data;
  const { displayTableDetails: dispatch } = useContext(GlobalDispatch);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex w-full justify-end px-4">
        <Language />
      </div>

      <div className="w-screen flex h-4/6">
        <div
          ref={tableElemref}
          className="flex w-1/2 flex-col border-2 border-black m-4 px-4 cursor-pointer"
          onClick={() => {
            dispatch(false);
          }}
          onMouseLeave={() => {
            tableElemref.current.classList.remove("bg-gray-200");
          }}
          onMouseOver={(e) => {
            tableElemref.current.classList.add("bg-gray-200");
            tableElemref.current.classList.add("cursor-pointer");
          }}
        >
          <div
            className="max-w-1/2 bg-white px-4 h-full"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onMouseOver={(e) => {
              e.stopPropagation();
              tableElemref.current.classList.remove("bg-gray-200");
              tableElemref.current.classList.remove("cursor-pointer");
            }}
          >
            <div className="flex flex-col py-2 h-full">
              <Tables refetch={refetch} />
              <AddElement unit={"table"} />
            </div>
          </div>
        </div>
        <div className="w-1/2 m-4 border-2 border-black">
          <TableDetails numero={tableDetails} />
        </div>
      </div>
    </div>
  );
}
