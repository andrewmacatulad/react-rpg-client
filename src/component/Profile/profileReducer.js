import {
  SET_PROFILE,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE
} from "./profileAction";

export default function(state = {}, action) {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };

    case GET_PROFILE:
      console.log("reducer", action.payload);
      return {
        ...state,
        profile: action.payload
      };
    case CLEAR_CURRENT_PROFILE:
      return (state = {});
    default:
      return state;
  }
}
