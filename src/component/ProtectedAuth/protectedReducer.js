import { PROTECTED_PAGE } from "./protectedAction";

export default function(state = {}, action) {
  switch (action.type) {
    case PROTECTED_PAGE:
      return {
        ...state,
        page: action.payload
      };
    default:
      return state;
  }
}
