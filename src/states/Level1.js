import React, { useContext } from "react";
import Tables from "../components/primary/Tables";
import AddElement from "../components/sharedComponents/AddElement";
import NewTable from "../components/primary/NewTable";
import { GlobalState } from "../redux/GlobalProvider";
import Language from "../components/sharedComponents/Language";

function Level1() {
  // const level1Ref = useRef();
  const { ui, data } = useContext(GlobalState);
  const { addTable } = ui;
  const { refetch } = data;

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
