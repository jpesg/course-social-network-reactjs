import {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATE,
  LOADING_USER
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case SET_AUTHENTICATE:
      return {
        ...state,
        authenticated: true
      };

    case SET_UNAUTHENTICATED:
      return initialState; //log out

    case SET_USER:
      return {
        ...state,
        authenticated: true,
        ...action.payload,
        loading: false
      };
    default:
      return state;
  }
}
