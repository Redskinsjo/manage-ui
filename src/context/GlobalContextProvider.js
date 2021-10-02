import React, { useReducer, createContext } from "react";
import { displayReducer } from "../redux/reducers";

export const GlobalState = createContext();
export const GlobalDispatch = createContext();

const initialState = {
  tableDetails: false,
  addTable: false,
  addDish: false,
};

export default function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(displayReducer, initialState);
  return (
    <GlobalState.Provider value={state}>
      <GlobalDispatch.Provider value={dispatch}>
        {children}
      </GlobalDispatch.Provider>
    </GlobalState.Provider>
  );
}
