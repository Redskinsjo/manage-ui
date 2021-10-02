import { connect } from "react-redux";
import App from "../App";
import {
  displayTableDetails,
  displayAddTable,
  displayAddDish,
  displayTableMenu,
  displaySelectElem,
  getTables,
} from "./actionCreators";

export const mapStateToProps = (state) => {
  return {
    tableDetails: state.display.tableDetails,
    addTable: state.display.addTable,
    addDish: state.display.addDish,
    tableMenu: state.display.tableMenu,
    selectElem: state.display.selectElem,
    tables: state.data.tables,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    displayTableDetails: (numero) => {
      dispatch(displayTableDetails(numero));
    },
    displayAddTable: () => {
      dispatch(displayAddTable());
    },
    displayAddDish: () => {
      dispatch(displayAddDish());
    },
    displayTableMenu: (numero) => {
      dispatch(displayTableMenu(numero));
    },
    displaySelectElem: (id) => {
      dispatch(displaySelectElem(id));
    },
    getTables: (tables) => {
      dispatch(getTables(tables));
    },
  };
};

export const Container = connect(mapStateToProps, mapDispatchToProps)(App);
