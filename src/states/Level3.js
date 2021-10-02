import React, { useRef, useContext } from "react";
import Tables from "../components/primary/Tables";
import NewTable from "../components/primary/NewTable";
import NewDish from "../components/primary/NewDish";
import AddElement from "../components/sharedComponents/AddElement";
import TableDetails from "../components/primary/TableDetails";
import { GlobalState, GlobalDispatch } from "../App";
import Language from "../components/sharedComponents/Language";

export default function Level3({ refetch }) {
  const tableElemref = useRef();
  const { addTable, addDish, tableDetails } = useContext(GlobalState);
  const { displayTableDetails, displaySelectElem } = useContext(GlobalDispatch);

  return (
    <div
      className="flex flex-col h-full"
      onClick={() => {
        displaySelectElem(false);
      }}
    >
      <div className="flex w-full justify-end px-4">
        <Language />
      </div>

      <div className="w-screen flex h-4/6">
        <div
          ref={tableElemref}
          className="flex w-1/2 flex-col border-2 border-black m-4 px-4 cursor-pointer"
          onClick={() => {
            displayTableDetails(false);
          }}
          onMouseLeave={() => {
            tableElemref.current.classList.remove("bg-gray-200");
          }}
          onMouseOver={(e) => {
            tableElemref.current.classList.add("bg-gray-200");
            tableElemref.current.classList.add("cursor-pointer");
          }}
        >
          {/* <div className="absolute h-32 w-full hover:bg-gray-200"></div> */}
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
          <TableDetails numero={tableDetails.numero} />
        </div>
      </div>

      {/* level 4, then 3.1, then 3.2, in order */}
      {addTable && addDish ? (
        <div className="w-screen flex">
          <div className="flex w-1/2 flex-col border-2 border-black m-4 px-4">
            <div className="flex flex-col py-2 h-full">
              <NewTable refetch={refetch} />
            </div>
          </div>

          <div className="flex w-1/2 flex-col border-2 border-black m-4 px-4">
            <div className="flex flex-col py-2 h-full">
              <NewDish />
            </div>
          </div>
        </div>
      ) : addTable ? (
        <div className="w-screen flex">
          <div className="flex w-1/2 flex-col border-2 border-black m-4 px-4">
            <div className="flex flex-col py-2 h-full">
              <NewTable refetch={refetch} />
            </div>
          </div>
          <div className="w-1/2 invisible m-4 border-2 border-black"></div>
        </div>
      ) : addDish ? (
        <div className="w-screen flex">
          <div className="w-1/2 invisible m-4 border-2 border-black"></div>
          <div className="flex w-1/2 flex-col border-2 border-black m-4 px-4">
            <div className="flex flex-col py-2 h-full">
              <NewDish />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
