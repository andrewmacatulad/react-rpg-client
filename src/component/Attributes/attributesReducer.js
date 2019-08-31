import { GET_ATTRIBUTES } from "./attributesAction";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_ATTRIBUTES:
      return {
        ...state,
        stats: action.payload
      };
    default:
      return state;
  }
}
