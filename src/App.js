import React, { useState, useEffect, useCallback, createContext } from "react";
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
import Level4 from "./states/Level4";
import { useQuery } from "@apollo/client";
import { FETCH_TABLES } from "./apollo/queries";

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

const socket = io.connect("https://manage-graphql-api.herokuapp.com");

export const GlobalState = createContext();
export const GlobalDispatch = createContext();
export const GlobalTables = createContext();

function App({
  tableDetails,
  addTable,
  addDish,
  displayTableDetails,
  displayAddTable,
  displayAddDish,
  tableMenu,
  displayTableMenu,
  selectElem,
  displaySelectElem,
  tables,
  getTables,
}) {
  // socket.on("connect", () => {
  //   console.log("connection");
  // });
  const { loading, error, data, refetch } = useQuery(FETCH_TABLES);

  useEffect(() => {
    getTables(data?.tables || tables);
  });

  console.log(process.env.NODE_ENV);
  return (
    <GlobalTables.Provider value={data?.tables || tables}>
      <GlobalState.Provider
        value={{ tableDetails, addTable, addDish, tableMenu, selectElem }}
      >
        <GlobalDispatch.Provider
          value={{
            displayTableDetails,
            displayAddTable,
            displayAddDish,
            displayTableMenu,
            displaySelectElem,
            getTables,
          }}
        >
          {(addTable && addDish && tableDetails) ||
          (addTable && tableDetails) ||
          (addDish && tableDetails) ? (
            <Level3 refetch={refetch} />
          ) : tableDetails ? (
            <Level2 refetch={refetch} />
          ) : (
            <Level1 refetch={refetch} />
          )}
          {/* {addTable && addDish && tableDetails ? (
            <Level4 refetch={refetch} />
          ) : (addTable && tableDetails) || (addDish && tableDetails) ? (
            <Level3 refetch={refetch} />
          ) : tableDetails ? (
            <Level2 refetch={refetch} />
          ) : (
            <Level1 refetch={refetch} />
          )} */}
        </GlobalDispatch.Provider>
      </GlobalState.Provider>
    </GlobalTables.Provider>
  );
}

export default App;
