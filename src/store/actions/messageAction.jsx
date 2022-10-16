import axios from "axios";
import {
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

// GET ALL Members
export const getAllMembers = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_MEMBER_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/allChatUserList/${id}`
    );

    dispatch({ type: GET_ALL_MEMBER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_MEMBER_FAIL, payload: error.response.data });
  }
};

// GET ALL Messages
export const getAllMessages = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_MSG_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/getAllMessages/${id}`
    );

    dispatch({ type: GET_ALL_MSG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_MSG_FAIL, payload: error.response.data });
  }
};

// Create Message
export const msgCreate = (Data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_MESSAGE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/addMessage`,
      Data,
      config
    );

    dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data });
    dispatch(getAllMessages(Data?.chatId));
  } catch (error) {
    dispatch({
      type: CREATE_MESSAGE_FAIL,
      payload:
        error.response.data.message || "Something went wrong. Try again.",
    });
  }
};
