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
    displayTableDetails: (value) => {
      dispatch(displayTableDetails(value));
    },
    displayAddTable: () => {
      dispatch(displayAddTable());
    },
    displayAddDish: () => {
      dispatch(displayAddDish());
    },
    displayTableMenu: (value) => {
      dispatch(displayTableMenu(value));
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
