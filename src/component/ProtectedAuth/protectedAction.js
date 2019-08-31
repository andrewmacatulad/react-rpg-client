import axios from "axios";
import Cookies from "js-cookie";

import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../app/features/async/asyncActions";

export const PROTECTED_PAGE = "PROTECTED_PAGE";

export const getProtectPage = () => async dispatch => {
  dispatch(asyncActionStart());

  try {
    const res = await axios.get("http://localhost:5000/protected_page", {
      headers: { authorization: Cookies.get("test") },
      withCredentials: true
    });
    console.log("Error ", res.data);

    dispatch({
      type: PROTECTED_PAGE,
      payload: res.data
    });
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError());

    console.log(error);
  }
};
