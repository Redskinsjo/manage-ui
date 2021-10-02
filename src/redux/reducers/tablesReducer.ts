import { SET_TABLES } from "../actionCreators";

const dataInitialState = {
  tables: [],
};

interface IAction {
  type: string;
  tables: any[];
}

const tablesReducer = (state = dataInitialState, action: IAction) => {
  switch (action.type) {
    case SET_TABLES:
      return {
        ...state,
        tables: action.tables,
      };
    default:
      return state;
  }
};

export default tablesReducer;
