import React, { useRef, useContext } from "react";
import Tables from "../components/primary/Tables";
import AddElement from "../components/sharedComponents/AddElement";
import NewTable from "../components/primary/NewTable";
import { GlobalState } from "../App";
import Language from "../components/sharedComponents/Language";

function Level1({ getTables, refetch }) {
  // const level1Ref = useRef();
  const { addTable } = useContext(GlobalState);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex w-full justify-end px-4">
        <Language />
      </div>
      <div className="primary-layout justify-center w-screen border-2 border-black h-4/6">
        <Tables refetch={refetch} />
        <AddElement unit={"table"} />
      </div>
      {addTable && (
        <div className="primary-layout border-2 border-black">
          <NewTable refetch={refetch} />
        </div>
      )}
    </div>
  );
}

export default Level1;
