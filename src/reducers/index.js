import { combineReducers } from "redux";
import postsReducer from "./postsReducers";
import usersReducer from "./usersReducer";

export default combineReducers({
  posts: postsReducer,
  users: usersReducer,
});
