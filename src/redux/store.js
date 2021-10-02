import { displayReducer, dataReducer } from "./reducers";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  display: displayReducer,
  data: dataReducer,
});

const store = createStore(rootReducer);

export default store;
