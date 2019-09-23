import axios from "axios";
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from "../types";

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.data
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const uploadImage = FormData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", FormData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => {
      console.log(err);
    });
};

export const editUserDetails = userData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => {
      console.log(err);
    });
};

export const markNotificationsRead =  notificationIds => dispatch => {
  axios.post('/notifications', notificationIds)
  .then(() => {
    dispatch({ type: MARK_NOTIFICATIONS_READ })
  })
  .catch(err => {
    console.error(err);
  })
}

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", `Bearer ${token}`);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
