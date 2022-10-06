import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allUsersRequestReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { allEventsReducer, eventDetailsReducer } from "./reducers/eventReducer";
import {
  allStoriesReducer,
  aUserAllStoryReducer,
  likeStoryReducer,
  storyCommentReducer,
  storyDetailsReducer,
  updateStoryReducer,
} from "./reducers/storyReducer";
import { allMemberMsgReducer, msgReducer } from "./reducers/messageReducer";

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  userDetails: userDetailsReducer,
  usersRequest: allUsersRequestReducer,
  events: allEventsReducer,
  stories: allStoriesReducer,
  story: storyDetailsReducer,
  storyCmt: storyCommentReducer,
  updateStory: updateStoryReducer,
  aUserAllStory: aUserAllStoryReducer,
  eventDetails: eventDetailsReducer,
  allMemberMsg: allMemberMsgReducer,
  msgReducer: msgReducer,
  likeStory: likeStoryReducer,
});
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
