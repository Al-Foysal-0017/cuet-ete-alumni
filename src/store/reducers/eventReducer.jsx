import {
  ALL_EVENTS_FAIL,
  ALL_EVENTS_REQUEST,
  ALL_EVENTS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_EVENT_FAIL,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  EVENT_DETAILS_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
} from "../types/eventType";

// Get all events
export const allEventsReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case ALL_EVENTS_REQUEST:
    case CREATE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ALL_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };

    case ALL_EVENTS_FAIL:
    case CREATE_EVENT_FAIL:
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

// Get Event Details
export const eventDetailsReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case EVENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EVENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        event: action.payload.event,
      };

    case EVENT_DETAILS_FAIL:
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
