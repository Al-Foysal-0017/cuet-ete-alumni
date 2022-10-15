import axios from "axios";
import {
  ALL_EVENTS_REQUEST,
  ALL_EVENTS_SUCCESS,
  ALL_EVENTS_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
} from "../types/eventType";

// GET ALL EVENTS
export const getAllEvents = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_EVENTS_REQUEST });
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/events`);

    dispatch({ type: ALL_EVENTS_SUCCESS, payload: data.response });
  } catch (error) {
    dispatch({ type: ALL_EVENTS_FAIL, payload: error.response.data });
  }
};

// Get Single Story
export const getEventDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/event/${id}`
    );
    dispatch({ type: EVENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload: error.response.data.message || "Something went wrong.",
    });
  }
};

// Create Event
export const eventCreate = (eventData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_EVENT_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/create/event`,
      eventData,
      config
    );

    dispatch({ type: CREATE_EVENT_SUCCESS, payload: data.event });
    dispatch(getAllEvents());
  } catch (error) {
    dispatch({
      type: CREATE_EVENT_FAIL,
      payload:
        error.response.data.message || "Something went wrong. Try again.",
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
