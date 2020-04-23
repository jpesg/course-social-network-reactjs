import {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATE,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  MARK_NOTIFICATIONS_READ,
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_AUTHENTICATE:
      return {
        ...state,
        authenticated: true,
      };

    case SET_UNAUTHENTICATED:
      return initialState; //log out

    case SET_USER:
      return {
        ...state,
        authenticated: true,
        ...action.payload,
        loading: false,
      };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId,
          },
        ],
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.screamId !== action.payload.screamId
        ),
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((n) => (n.read = true));
      return {
        ...state,
      };
    default:
      return state;
  }
}
