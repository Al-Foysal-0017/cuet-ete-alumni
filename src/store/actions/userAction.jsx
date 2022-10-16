import {
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_ERRORS,
  ACTIVATION_REQUEST,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  CLEAR_MESSAGE,
  SET_LOADER,
  CLOSE_LOADER,
  SET_TOKEN,
  REGISTER_ERRORS,
  LOGIN_ERRORS,
  LOGOUT,
  LOGOUT_FAIL,
} from "../types/userConstants";
import axios from "axios";

// Login
export const login = (loginData) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADER });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/signin`,
      loginData,
      config
    );
    localStorage.setItem("myToken", data.token);
    dispatch({ type: CLOSE_LOADER });
    localStorage.setItem("myToken", data.token);
    dispatch({ type: SET_TOKEN, payload: data.token });
  } catch (error) {
    dispatch({ type: CLOSE_LOADER });
    dispatch({
      type: LOGIN_ERRORS,
      payload:
        error.response.data.message || "Something went wrong. Try again.",
    });
  }
};

// Register
export const signup = (userData) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADER });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/signup/verify`,
      userData,
      config
    );
    localStorage.setItem("myToken", data.token);
    dispatch({ type: CLOSE_LOADER });
    dispatch({ type: SET_TOKEN, payload: data.token });
  } catch (error) {
    dispatch({ type: CLOSE_LOADER });
    dispatch({
      type: REGISTER_ERRORS,
      payload: error.response.data || "Something went wrong. Try again.",
    });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("myToken");
    dispatch({ type: LOGOUT });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload:
        error.response.data.message || "Something went wrong. Try again.",
    });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch, getState) => {
  const {
    user: { token },
  } = getState();
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/profile/update`,
      userData,
      config
    );
    localStorage.setItem("myToken", data.token);
    dispatch({ type: SET_TOKEN, payload: data.token });
    dispatch(getAllUsers());
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response.data.message || "Something went wrong. Try again.",
    });
  }
};

//Activation User
export const activation = (token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIVATION_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/activation`,
      { token },
      config
    );
    dispatch({ type: ACTIVATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ACTIVATION_FAIL, payload: error.response.data });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/request`
    );

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/${id}`
    );

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User
export const updateUserRole = (id, userData) => async (dispatch, getState) => {
  const {
    user: { token },
  } = getState();
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    dispatch(getAllUsers());
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
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
