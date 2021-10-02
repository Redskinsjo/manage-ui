import { connect } from "react-redux";
import GlobalProvider from "./GlobalProvider";
import {
  displayTableDetails,
  displayAddTable,
  displayAddDish,
  displayTableMenu,
  displaySelectElem,
  setTables,
} from "./actionCreators";

export const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    data: state.data,
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
    setTables: (tables) => {
      dispatch(setTables(tables));
    },
  };
};

export const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalProvider);
