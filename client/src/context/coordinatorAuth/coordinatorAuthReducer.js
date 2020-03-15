import {
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
  REGISTER_COORDINATOR_SUCCESS,
  REGISTER_COORDINATOR_FAIL,
  LOGIN_COORDINATOR,
  COORDINATOR_LOADED
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case COORDINATOR_LOADED:
      return {
        ...state,
        isCoordinator: true,
        loading: false,
        coordinator: action.payload
      };
    case REGISTER_COORDINATOR_SUCCESS:
    case LOGIN_COORDINATOR:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isCoordinator: true,
        loading: false
      };
    case REGISTER_COORDINATOR_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isCoordinator: false,
        loading: false,
        coordinator: null,
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
