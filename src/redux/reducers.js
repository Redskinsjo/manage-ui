import {
  DISPLAY_ADD_DISH,
  DISPLAY_ADD_TABLE,
  DISPLAY_TABLE_DETAILS,
  DISPLAY_TABLE_MENU,
  DISPLAY_SELECT_ELEM,
  GET_TABLES,
} from "./actionCreators";

const initialState = {
  tableDetails: false,
  tableMenu: false,
  addTable: false,
  addDish: false,
  selectElem: false,
};

export const displayReducer = (state = initialState, action) => {
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
      return Object.assign(
        {},
        state,
        // state.tableMenu ? { tableMenu: false } : { tableMenu: action.numero }
        { tableMenu: action.numero }
      );
    case DISPLAY_SELECT_ELEM:
      return Object.assign({}, state, { selectElem: action.id });
    default:
      return state;
  }
};

export const dataReducer = (state = { tables: [] }, action) => {
  switch (action.type) {
    case GET_TABLES:
      return {
        tables: action.tables,
      };
    default:
      return state;
  }
};
