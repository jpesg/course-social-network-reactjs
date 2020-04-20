import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  POST_SCREAM,
} from "../types";

export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/screams")
    .then((res) => {
      dispatch({ type: SET_SCREAMS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_SCREAMS, payload: [] });
    });
};

export const postScream = (newScram) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/scream`, newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((e) => {
      dispatch({
        type: SET_ERRORS,
        payload: e.response.data,
      });
    });
};

export const likeScream = (screamId) => (dispatch) => {
  axios
    .post(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_SCREAM, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .post(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_SCREAM, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/scream/${screamId}`)
    .then((res) => {
      dispatch({ type: DELETE_SCREAM, payload: screamId });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
