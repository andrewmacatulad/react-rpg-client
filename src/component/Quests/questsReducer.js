import { GET_QUESTS, GET_QUEST } from "./questsAction";

const initialState = {
  quests: {},
  quest: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTS:
      return { ...state, quests: action.payload };
    case GET_QUEST:
      return { ...state, quest: action.payload };
    default:
      return state;
  }
}
