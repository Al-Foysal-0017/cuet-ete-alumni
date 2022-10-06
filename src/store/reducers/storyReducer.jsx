import {
  ALL_STORIES_FAIL,
  ALL_STORIES_REQUEST,
  ALL_STORIES_SUCCESS,
  A_SINGLE_USER_STORIES_FAIL,
  A_SINGLE_USER_STORIES_REQUEST,
  A_SINGLE_USER_STORIES_SUCCESS,
  CLEAR_ERRORS,
  CREATE_STORY_FAIL,
  CREATE_STORY_REQUEST,
  CREATE_STORY_SUCCESS,
  LIKE_STORY_FAIL,
  LIKE_STORY_REQUEST,
  LIKE_STORY_SUCCESS,
  STORY_COMMENT_FAIL,
  STORY_COMMENT_REQUEST,
  STORY_COMMENT_SUCCESS,
  STORY_DETAILS_FAIL,
  STORY_DETAILS_REQUEST,
  STORY_DETAILS_SUCCESS,
  UPDATE_STORY_FAIL,
  UPDATE_STORY_REQUEST,
  UPDATE_STORY_SUCCESS,
} from "../types/storyType";

export const allStoriesReducer = (state = { stories: [] }, action) => {
  switch (action.type) {
    case ALL_STORIES_REQUEST:
    case CREATE_STORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_STORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        stories: action.payload,
      };
    case CREATE_STORY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case ALL_STORIES_FAIL:
    case CREATE_STORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const storyDetailsReducer = (state = { story: {} }, action) => {
  switch (action.type) {
    case STORY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case STORY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        story: action.payload.story,
        comments: action.payload.responseComments,
      };

    case STORY_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const storyCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case STORY_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case STORY_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.msg,
      };

    case STORY_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateStoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_STORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_STORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const aUserAllStoryReducer = (state = { aUserStories: {} }, action) => {
  switch (action.type) {
    case A_SINGLE_USER_STORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case A_SINGLE_USER_STORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        aUserStories: action.payload,
      };

    case A_SINGLE_USER_STORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const likeStoryReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_STORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIKE_STORY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case LIKE_STORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
