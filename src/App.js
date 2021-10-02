import React, { useContext } from "react";
import "./App.css";
import io from "socket.io-client";
import data from "./data.json";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircle,
  faPlus,
  faMinus,
  faEllipsisH,
  faTrashAlt,
  faCheck,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { faBtc } from "@fortawesome/free-brands-svg-icons";
import Level1 from "./states/Level1";
import Level2 from "./states/Level2";
import Level3 from "./states/Level3";
import { devUri, prodUri } from "./apollo/uris";
import { GlobalState } from "./redux/GlobalProvider";

library.add(
  faCircle,
  faPlus,
  faMinus,
  faEllipsisH,
  faTrashAlt,
  faBtc,
  faCheck,
  faCaretDown
);

const server = process.env.NODE_ENV === "development" ? devUri : prodUri;
const socket = io.connect(server);

function App() {
  // socket.on("connect", () => {
  //   console.log("connection");
  // });
  const { ui } = useContext(GlobalState);
  const { addTable, addDish, tableDetails } = ui;

  return (
    <>
      {(addTable && addDish && tableDetails) ||
      (addTable && tableDetails) ||
      (addDish && tableDetails) ? (
        <Level3 />
      ) : tableDetails ? (
        <Level2 />
      ) : (
        <Level1 />
      )}
    </>
  );
}

export default App;
