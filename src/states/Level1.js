import React, { useContext } from "react";
import Tables from "../components/primary/Tables";
import AddElement from "../components/sharedComponents/AddElement";
import NewTable from "../components/primary/NewTable";
import { GlobalState, GlobalDispatch } from "../redux/GlobalProvider";
import Language from "../components/sharedComponents/Language";

function Level1() {
  // const level1Ref = useRef();
  const { ui } = useContext(GlobalState);
  const { addTable, tableMenu } = ui;
  const { displayTableMenu } = useContext(GlobalDispatch);

  return (
    <div
      className="flex flex-col h-screen"
      onClick={() => {
        if (tableMenu) {
          displayTableMenu(false);
        }
      }}
    >
      <div className="flex w-full justify-end px-4">
        <Language />
      </div>
      <div className="primary-layout justify-center w-screen border-2 border-black h-4/6 bg-gray-300">
        <Tables />
        <AddElement unit={"table"} />
      </div>
      {addTable && (
        <div className="primary-layout border-2 border-black bg-black">
          <NewTable />
        </div>
      )}
    </div>
  );
}

export default Level1;
