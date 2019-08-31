import {
  LOGIN_USER,
  GET_USER,
  AUTH_ERROR,
  SIGNUP_USER,
  UNAUTH_USER
} from "./signInAction";
import isEmpty from "../common/isEmpty";

const initializeState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initializeState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SIGNUP_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case UNAUTH_USER:
      return {
        ...state,
        isAuthenticated: false
      };
    case AUTH_ERROR:
      console.log(action.payload);
      return { ...state, error: action.payload.message };
    default:
      return state;
  }
}
