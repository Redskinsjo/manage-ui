import uiReducer from "./reducers/uiReducer";
import tablesReducer from "./reducers/tablesReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  ui: uiReducer,
  data: tablesReducer,
});

export default rootReducer;
