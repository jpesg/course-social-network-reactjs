import { SET_USER, SET_UNAUTHENTICATED, SET_AUTHENTICATE } from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: []
};
export default function(state = initialState, action) {
  switch (action.type) {
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
        ...action.payload
      };
    default:
      return state;
  }
}
