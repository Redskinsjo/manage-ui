import React, { useRef, useContext } from "react";
import Tables from "../components/primary/Tables";
import AddElement from "../components/sharedComponents/AddElement";
import TableDetails from "../components/primary/TableDetails";
import { GlobalState, GlobalDispatch } from "../redux/GlobalProvider";
import Language from "../components/sharedComponents/Language";
import ReturnBar from "../components/sharedComponents/ReturnBar";

export default function Level2() {
  const [hover, setHover] = React.useState();
  const { ui, data } = useContext(GlobalState);
  const { tableDetails, tableMenu } = ui;
  const { refetch } = data;
  const { displayTableDetails, displayTableMenu } = useContext(GlobalDispatch);

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

      <div className="w-screen flex h-4/6">
        <div className="flex w-1/2 flex border-2 border-black m-4 r">
          <ReturnBar
            hover={hover}
            setHover={setHover}
            dispatch={displayTableDetails}
          />
          <div className="w-full bg-white px-4 h-full">
            <div className="flex flex-col py-2 h-full">
              <Tables refetch={refetch} />
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
    </div>
  );
}
