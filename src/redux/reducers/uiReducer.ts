import {
  DISPLAY_ADD_DISH,
  DISPLAY_ADD_TABLE,
  DISPLAY_TABLE_DETAILS,
  DISPLAY_TABLE_MENU,
  DISPLAY_SELECT_ELEM,
} from "../actionCreators";
import { combineReducers } from "redux";

const uiInitialState = {
  tableDetails: false,
  tableMenu: false,
  addTable: false,
  addDish: false,
  selectElem: false,
};

interface IAction {
  type: string;
  numero?: number;
  id?: string;
}

const uiReducer = (state = uiInitialState, action: IAction) => {
  switch (action.type) {
    case DISPLAY_ADD_DISH:
      return Object.assign({}, state, { addDish: !state.addDish });
    case DISPLAY_ADD_TABLE:
      return Object.assign({}, state, { addTable: !state.addTable });
    case DISPLAY_TABLE_DETAILS:
      return Object.assign(
        {},
        state,
        !state.tableDetails
          ? { tableDetails: action.numero }
          : state.tableDetails && action.numero
          ? { tableDetails: action.numero }
          : { tableDetails: false }
      );
    case DISPLAY_TABLE_MENU:
      return Object.assign({}, state, { tableMenu: action.numero });
    case DISPLAY_SELECT_ELEM:
      return Object.assign({}, state, { selectElem: action.id });
    default:
      return state;
  }
};

export default uiReducer;
