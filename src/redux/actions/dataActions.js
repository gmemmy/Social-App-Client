import axios from "axios";
import {
  SET_POST,
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  LOADING_UI,
  ADD_POST,
  SUBMIT_COMMENT,
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI
} from "../types";

// Get All Posts
export const getPosts = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then(res => {
      dispatch({
        type: SET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_POSTS,
        payload: []
      });
    });
};

// Get a single post
export const singlePost = (postId) =>  dispatch => {
  dispatch({ type: LOADING_UI })
  axios.get(`/post/${postId}`)
  .then(res => {
    dispatch({ 
      type: SET_POST,
      payload: res.data
    });
    dispatch({ type: STOP_LOADING_UI })
  })
  .catch(err => {
    console.error(err);
  })
}

// Create a new post
export const addPost = newPost => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/post", newPost)
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      console.error(err);
    });
};

// Like A Post
export const likeAPost = postId => dispatch => {
  axios
    .get(`/post/${postId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_POST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Unlike A post
export const unlikeAPost = postId => dispatch => {
  axios
    .get(`/post/${postId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deletePost = postId => dispatch => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({
        type: DELETE_POST,
        payload: postId
      });
    })
    .catch(err => {
      console.error(err);
    });
};

export const createAComment = (postId, commentData) =>  dispatch => {
  axios.post(`/post/${postId}/comment`, commentData)
  .then(res => {
    dispatch({
      type: SUBMIT_COMMENT,
      payload: res.data
    });
    dispatch(clearErrors());
  })
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
    console.error(err);
  })
}

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
