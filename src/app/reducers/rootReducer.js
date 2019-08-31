import { combineReducers } from "redux";

import testReducer from "./testReducer";
import asyncReducer from "../features/async/asyncReducer";
import signInReducer from "../../component/signin/signInReducer";
import protectedReducer from "../../component/ProtectedAuth/protectedReducer";
import attributesReducer from "../../component/Attributes/attributesReducer";
import profileReducer from "../../component/Profile/profileReducer";
import questsReducer from "../../component/Quests/questsReducer";

const rootReducer = combineReducers({
  test: testReducer,
  async: asyncReducer,
  user: signInReducer,
  page: protectedReducer,
  attributes: attributesReducer,
  profile: profileReducer,
  quests: questsReducer
});

export default rootReducer;
