import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import matchReducer from "./MatchReducer";
export const reducers = combineReducers({
  authReducer,
  matchReducer,
});
