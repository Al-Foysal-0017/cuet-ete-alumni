import axios from "axios";
import {
  ALL_STORIES_FAIL,
  ALL_STORIES_REQUEST,
  ALL_STORIES_SUCCESS,
  CREATE_STORY_FAIL,
  CREATE_STORY_REQUEST,
  CREATE_STORY_SUCCESS,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  STORY_DETAILS_FAIL,
  STORY_DETAILS_REQUEST,
  STORY_DETAILS_SUCCESS,
  STORY_COMMENT_REQUEST,
  STORY_COMMENT_SUCCESS,
  STORY_COMMENT_FAIL,
  UPDATE_STORY_REQUEST,
  UPDATE_STORY_SUCCESS,
  UPDATE_STORY_FAIL,
  A_SINGLE_USER_STORIES_REQUEST,
  A_SINGLE_USER_STORIES_SUCCESS,
  A_SINGLE_USER_STORIES_FAIL,
  LIKE_STORY_REQUEST,
  LIKE_STORY_SUCCESS,
  LIKE_STORY_FAIL,
} from "../types/storyType";

// GET ALL Stories
export const getAllStories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_STORIES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/stories`
    );

    dispatch({ type: ALL_STORIES_SUCCESS, payload: data.response });
  } catch (error) {
    dispatch({ type: ALL_STORIES_FAIL, payload: error.response.data });
  }
};

// Create Story
export const storyCreate = (storyData) => async (dispatch, getState) => {
  const {
    user: { token },
  } = getState();
  try {
    dispatch({ type: CREATE_STORY_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/create/story`,
      storyData,
      config
    );

    dispatch({ type: CREATE_STORY_SUCCESS, payload: data.story });
    dispatch(getAllStories());
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: CREATE_STORY_FAIL,
      payload:
        error.response.data.message || "Something went wrong. Try again.",
    });
  }
};

// Get Single Story
export const getStoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STORY_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/story/${id}`
    );
    console.log(data);
    dispatch({ type: STORY_DETAILS_SUCCESS, payload: data });
    console.log(`It's called. ID-${id}`);
  } catch (error) {
    dispatch({
      type: STORY_DETAILS_FAIL,
      payload: error.response.data.message || "Something went wrong.",
    });
  }
};

//Create Story Comment
export const storyCommentCreate = (storyCommentData) => async (dispatch) => {
  try {
    dispatch({ type: STORY_COMMENT_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/story/comment`,
      storyCommentData,
      config
    );
    dispatch({ type: STORY_COMMENT_SUCCESS, payload: data });
    dispatch(getStoryDetails(storyCommentData?.commentId));
  } catch (error) {
    dispatch({
      type: STORY_COMMENT_FAIL,
      payload:
        error.response.data.message || "Something went wrong. Try again.",
    });
  }
};

//LIKE Story
export const likeStory = (storyId, userId) => async (dispatch, getState) => {
  const {
    user: { token },
  } = getState();
  try {
    dispatch({ type: LIKE_STORY_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/story/like/${storyId}`,
      { userId },
      config
    );
    console.log(data);
    dispatch({ type: LIKE_STORY_SUCCESS, payload: data });
    dispatch(getAllStories());
  } catch (error) {
    dispatch({
      type: LIKE_STORY_FAIL,
      payload:
        error.response.data.message || "Something went wrong. Try again.",
    });
  }
};

// Update User
export const updateStory = (id, storyData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_STORY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/story/${id}`,
      storyData,
      config
    );

    dispatch({ type: UPDATE_STORY_SUCCESS, payload: data.success });
    dispatch(getAllStories());
  } catch (error) {
    dispatch({
      type: UPDATE_STORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get A SINGLE user all Stories
export const getAsingleUserStories = (id) => async (dispatch) => {
  try {
    dispatch({ type: A_SINGLE_USER_STORIES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/all/story/${id}`
    );
    dispatch({
      type: A_SINGLE_USER_STORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: A_SINGLE_USER_STORIES_FAIL,
      payload: error.response.data.message || "Something went wrong.",
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// Clearing Message
export const clearMessage = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGE });
};
