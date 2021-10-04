import React, { useEffect, createContext } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_TABLES } from "../apollo/queries";
import App from "../App";

export const GlobalState = createContext({});
export const GlobalDispatch = createContext({});

const GlobalProvider = ({
  ui,
  data: storedData,
  displayTableDetails,
  displayAddTable,
  displayAddDish,
  displayTableMenu,
  displaySelectElem,
  setTables,
}) => {
  const { loading, error, data, refetch } = useQuery(FETCH_TABLES);

  useEffect(() => {
    setTables(data?.tables || storedData?.tables);
  }, []);

  // include db fetched data if present
  storedData = data && Object.assign(storedData, { tables: data.tables });
  // include refetch function
  const state = {
    ui,
    data: { ...storedData, refetch },
  };
  console.log(state.data);
  return (
    <GlobalState.Provider value={state}>
      <GlobalDispatch.Provider
        value={{
          displayTableDetails,
          displayAddTable,
          displayAddDish,
          displayTableMenu,
          displaySelectElem,
          setTables,
        }}
      >
        <App />
      </GlobalDispatch.Provider>
    </GlobalState.Provider>
  );
};

export default GlobalProvider;
