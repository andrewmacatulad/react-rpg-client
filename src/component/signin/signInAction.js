import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish
} from "../../app/features/async/asyncActions";
export const LOGIN_USER = "LOGIN_USER";
export const SIGNUP_USER = "SIGNUP_USER";
export const AUTH_ERROR = "AUTH_ERROR";
export const UNAUTH_USER = "UNAUTH_USER";

export const GET_USER = "GET_USER";

export const signupUser = values => async dispatch => {
  dispatch(asyncActionStart());

  try {
    const res = await axios.post(
      "http://localhost:5000/register",
      {
        email: values.email,
        password: values.password,
        name: values.name
      },
      {
        withCredentials: true
      }
    );

    dispatch({
      type: SIGNUP_USER,
      payload: res.data
    });
    toast.success("User successfully created");
    // history.push("/");
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError());
    toast.error(error.response.data.message);
    dispatch(authError(error.response.data));
  }
};

export const loginUser = values => async dispatch => {
  // dispatch(asyncActionStart());

  // try {
  //   const res = await axios.post(
  //     "http://localhost:5000/test_login",
  //     {
  //       email: values.email,
  //       password: values.password
  //     },
  //     {
  //       withCredentials: true
  //     }
  //   );

  //   dispatch({
  //     type: LOGIN_USER,
  //     payload: res.data
  //   });
  //   Cookies.set("test", res.data.token, { path: "/", expires: 365 });
  //   // history.push("/");

  //   dispatch(asyncActionFinish());
  //   dispatch(getUser());
  dispatch(asyncActionStart());

  try {
    const res = await axios.post(
      "http://localhost:5000/login",
      {
        email: values.email,
        password: values.password
      },
      {
        withCredentials: true
      }
    );

    // dispatch({
    //   type: LOGIN_USER,
    //   payload: res.data
    // });
    Cookies.set("test", res.data.token, { path: "/", expires: 365 });
    const tokenCookie = Cookies.get("test");
    dispatch(getUser(tokenCookie));
    // history.push("/");

    dispatch(asyncActionFinish());
    toast.success("User successfully logged in");
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(asyncActionError());

    dispatch(authError(error.response.data));
  }
};

export const signoutUser = history => async dispatch => {
  dispatch(asyncActionStart());
  await axios.get("http://localhost:5000/logout");
  Cookies.remove("test");
  dispatch({ type: UNAUTH_USER });
  // console.log(res.data)

  history.push("/");
  // dispatch(getUser());
  dispatch(asyncActionFinish());
};

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export const getUser = cookieToken => async dispatch => {
  dispatch(asyncActionStart());
  console.log(cookieToken);
  try {
    const res = await axios.get("http://localhost:5000/current_user", {
      headers: { authorization: cookieToken },
      withCredentials: true
    });
    console.log("Get user ", res);
    dispatch({
      type: GET_USER,
      payload: res.data
    });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError());
  }
};

// export const getUser = () => async dispatch => {
//   dispatch(asyncActionStart());
//   console.log(Cookies.get("test"));
//   try {
//     const res = await axios.get("http://localhost:5000/current_user", {
//       headers: { authorization: Cookies.get("test") },
//       withCredentials: true
//     });
//     console.log("Get user ", res);
//     dispatch({
//       type: GET_USER,
//       payload: res.data
//     });
//     dispatch(asyncActionFinish());
//   } catch (err) {
//     dispatch(asyncActionError());
//   }
// };
