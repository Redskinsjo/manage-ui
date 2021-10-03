export const DISPLAY_TABLE_DETAILS = "DISPLAY_TABLE_DETAILS";
export const DISPLAY_ADD_TABLE = "DISPLAY_ADD_TABLE";
export const DISPLAY_ADD_DISH = "DISPLAY_ADD_DISH";
export const DISPLAY_TABLE_MENU = "DISPLAY_TABLE_MENU";
export const SET_TABLES = "SET_TABLES";
export const DISPLAY_SELECT_ELEM = "DISPLAY_SELECT_ELEM";

export const displayTableDetails = (value) => {
  return {
    type: DISPLAY_TABLE_DETAILS,
    value,
  };
};
export const displayAddDish = () => {
  return {
    type: DISPLAY_ADD_DISH,
  };
};
export const displayAddTable = () => {
  return {
    type: DISPLAY_ADD_TABLE,
  };
};
export const displayTableMenu = (value) => {
  return {
    type: DISPLAY_TABLE_MENU,
    value,
  };
};
export const displaySelectElem = (id) => {
  return {
    type: DISPLAY_SELECT_ELEM,
    id,
  };
};
export const setTables = (tables) => {
  return {
    type: SET_TABLES,
    tables,
  };
};
