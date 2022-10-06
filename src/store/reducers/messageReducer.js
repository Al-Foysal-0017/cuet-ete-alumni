import {
  CLEAR_ERRORS,
  CREATE_MESSAGE_FAIL,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_MEMBER_FAIL,
  GET_ALL_MEMBER_REQUEST,
  GET_ALL_MEMBER_SUCCESS,
  GET_ALL_MSG_FAIL,
  GET_ALL_MSG_REQUEST,
  GET_ALL_MSG_SUCCESS,
} from "../types/messageType";

export const allMemberMsgReducer = (state = { msgMembers: {} }, action) => {
  switch (action.type) {
    case GET_ALL_MEMBER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        msgMembers: action.payload,
      };

    case GET_ALL_MEMBER_FAIL:
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

export const msgReducer = (state = { msgs: {} }, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
    case GET_ALL_MSG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_MSG_SUCCESS:
      return {
        ...state,
        loading: false,
        msgs: action.payload,
      };

    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CREATE_MESSAGE_FAIL:
    case GET_ALL_MSG_FAIL:
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
