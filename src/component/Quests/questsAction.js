import axios from "axios";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../app/features/async/asyncActions";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const GET_QUESTS = "GET_QUESTS";
export const GET_QUEST = "GET_QUEST";
export const ADD_QUEST = "ADD_QUEST";
export const UPDATE_QUEST = "UPDATE_QUEST";

export const getQuests = () => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const res = await axios.get("http://localhost:5000/quests", {
      // headers: { authorization: cookieToken },
      withCredentials: true
    });
    dispatch({
      type: GET_QUESTS,
      payload: res.data
    });
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const getQuestsStatusCleared = () => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const res = await axios.get("http://localhost:5000/quests_cleared", {
      // headers: { authorization: cookieToken },
      withCredentials: true
    });

    console.log("CLeard ", res.data);
    dispatch({
      type: GET_QUESTS,
      payload: res.data
    });
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const getQuestsType = type => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const res = await axios.get(`http://localhost:5000/quests/${type}`, {
      headers: { authorization: Cookies.get("test") },
      withCredentials: true
    });
    dispatch({
      type: GET_QUESTS,
      payload: res.data
    });
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const getQuestSingle = questId => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const res = await axios.get(`http://localhost:5000/quest/${questId}`, {
      headers: { authorization: Cookies.get("test") },
      withCredentials: true
    });
    dispatch({
      type: GET_QUEST,
      payload: res.data
    });
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const updateQuestStatus = (
  questId,
  status,
  history
) => async dispatch => {
  dispatch(asyncActionStart());
  console.log(status);
  try {
    const res = await axios.patch(
      `http://localhost:5000/quest/${questId}`,
      { status },
      {
        headers: { authorization: Cookies.get("test") },
        withCredentials: true
      }
    );
    dispatch({
      type: UPDATE_QUEST
    });
    history.push("/quests");
    toast.success("Quest Succesfully Completed");
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const addQuests = (values, history) => async dispatch => {
  dispatch(asyncActionStart());
  try {
    const res = await axios.post(
      "http://localhost:5000/quest",
      {
        questTitle: values.questTitle,
        questObjective: values.questObjective,
        questType: values.questType,
        questStatus: "ongoing"
      },
      {
        headers: { authorization: Cookies.get("test") },
        withCredentials: true
      }
    );
    dispatch({
      type: ADD_QUEST
    });

    toast.success("Quest added successfully");
    history.push("/quests");
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
