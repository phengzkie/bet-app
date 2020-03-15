import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_COORDINATOR_SUCCESS,
  COORDINATOR_LOADED,
  GET_COORDINATORS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_COORDINATORS:
      return {
        ...state,
        coordinators: action.payload,
        loading: false
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isCoordinator: false,
        loading: false,
        user: action.payload
      };
    case COORDINATOR_LOADED:
      return {
        ...state,
        isCoordinator: true,
        isAuthenticated: false,
        loading: false,
        coordinator: action.payload
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isCoordinator: false,
        loading: false
      };
    case REGISTER_COORDINATOR_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isCoordinator: true,
        loading: false
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isCoordinator: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
