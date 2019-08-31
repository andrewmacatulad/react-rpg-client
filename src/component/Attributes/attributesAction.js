import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../app/features/async/asyncActions";

export const GET_ATTRIBUTES = "GET_ATTRIBUTES";
export const SET_ATTRIBUTES = "SET_ATTRIBUTES";

export const getAttributes = () => async dispatch => {
  dispatch(asyncActionStart());

  try {
    const res = await axios.get("http://localhost:5000/attributes", {
      headers: { authorization: Cookies.get("test") },
      withCredentials: true
    });
    console.log("Error ", res.data);

    dispatch({
      type: GET_ATTRIBUTES,
      payload: res.data
    });
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError());

    console.log(error);
  }
};

export const setAttributes = values => async dispatch => {
  dispatch(asyncActionStart());

  try {
    const res = await axios.patch(
      "http://localhost:5000/attributes",
      {
        strength: values.strength,
        vitality: values.vitality,
        intelligence: values.intelligence,
        spirit: values.spirit,
        luck: values.luck,
        statPointsRemaining: values.statPointsRemaining
      },
      {
        headers: { authorization: Cookies.get("test") },
        withCredentials: true
      }
    );

    console.log(res.data);
    dispatch({
      type: GET_ATTRIBUTES,
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
