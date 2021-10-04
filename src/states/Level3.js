import React, { useRef, useContext } from "react";
import Tables from "../components/primary/Tables";
import NewTable from "../components/primary/NewTable";
import NewDish from "../components/primary/NewDish";
import AddElement from "../components/sharedComponents/AddElement";
import TableDetails from "../components/primary/TableDetails";
import { GlobalState, GlobalDispatch } from "../redux/GlobalProvider";
import Language from "../components/sharedComponents/Language";
import ReturnBar from "../components/sharedComponents/ReturnBar";

export default function Level3() {
  const [hover, setHover] = React.useState();
  const { ui } = useContext(GlobalState);
  const { addTable, addDish, tableDetails, tableMenu } = ui;
  const { displayTableDetails, displaySelectElem, displayTableMenu } =
    useContext(GlobalDispatch);

  return (
    <div
      className="flex flex-col h-full"
      onClick={() => {
        displaySelectElem(false);
        if (tableMenu) {
          displayTableMenu(false);
        }
      }}
    >
      <div className="flex w-full justify-end px-4">
        <Language />
      </div>

      <div className="w-screen flex h-4/6">
        <div className="flex w-1/2 border-2 border-black m-4">
          <ReturnBar
            hover={hover}
            setHover={setHover}
            dispatch={displayTableDetails}
          />
          <div className="w-full bg-white px-4 h-full">
            <div className="flex flex-col py-2 h-full">
              <Tables />
              <AddElement unit={"table"} />
            </div>
          </div>
          <ReturnBar
            hover={hover}
            setHover={setHover}
            dispatch={displayTableDetails}
          />
        </div>
        <div className="w-1/2 m-4 border-2 border-black">
          <TableDetails numero={tableDetails} />
        </div>
      </div>

      {/* level 4, then 3.1, then 3.2, in order */}
      {addTable && addDish ? (
        <div className="w-screen flex">
          <div className="flex w-1/2 flex-col border-2 border-black m-4 px-4">
            <div className="flex flex-col py-2 h-full">
              <NewTable />
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
              <NewTable />
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
