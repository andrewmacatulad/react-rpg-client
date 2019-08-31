import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../app/features/async/asyncActions";

export const GET_PROFILE = "GET_PROFILE";
export const SET_PROFILE = "SET_PROFILE";
export const CLEAR_CURRENT_PROFILE = "CLEAR_CURRENT_PROFILE";

export const getProfile = () => async dispatch => {
  dispatch(asyncActionStart());

  try {
    const res = await axios.get("http://localhost:5000/profile", {
      headers: { authorization: Cookies.get("test") },
      withCredentials: true
    });

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log("error ", error);
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
    dispatch(asyncActionError());
  }
};

export const setProfile = values => async dispatch => {
  dispatch(asyncActionStart());

  console.log(values);
  try {
    const res = await axios.post(
      "http://localhost:5000/profile",
      {
        name: values.name,
        gender: values.gender,
        birthday: values.birthday,
        address: values.address
      },
      {
        headers: { authorization: Cookies.get("test") },
        withCredentials: true
      }
    );

    dispatch({
      type: SET_PROFILE,
      payload: res.data
    });
    toast.success("Stats successfully set");
    // history.push("/");
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError());
    toast.error(error.response.data.message);
    // dispatch(authError(error.response.data));
  }
};

export const updateProfile = (values, history) => async dispatch => {
  dispatch(asyncActionStart());

  console.log(values);
  try {
    const res = await axios.patch(
      "http://localhost:5000/profile",
      {
        name: values.name,
        gender: values.gender,
        birthday: values.birthday,
        address: values.address
      },
      {
        headers: { authorization: Cookies.get("test") },
        withCredentials: true
      }
    );

    // dispatch({
    //   type: SET_PROFILE,
    //   payload: res.data
    // });
    toast.success("Stats successfully Updated");
    dispatch(clearCurrentProfile());
    history.push("/");
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError());
    toast.error(error.response.data.message);
    // dispatch(authError(error.response.data));
  }
};

const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
