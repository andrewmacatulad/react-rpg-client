import { TESTING_LANG, SEQUELIZE_LANG } from "../testAction";
const initialState = { localTest: {}, dbTest: {} };

export default function(state = initialState, action) {
  switch (action.type) {
    case TESTING_LANG:
      return { ...state, localTest: action.payload };
    case SEQUELIZE_LANG:
      return { ...state, dbTest: action.payload };
    default:
      return state;
  }
}
