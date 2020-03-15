import React, { useReducer } from 'react';
import axios from 'axios';
import CoordinatorAuthContext from './coordinatorAuthContext';
import coordinatorAuthReducer from './coordinatorAuthReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  LOGOUT,
  CLEAR_ERRORS,
  COORDINATOR_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_COORDINATOR
} from '../types';

const CoordinatorAuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    loading: true,
    error: null,
    coordinator: null,
    isCoordinator: null
  };

  const [state, dispatch] = useReducer(coordinatorAuthReducer, initialState);

  // Load Coordinator
  const loadCoordinator = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth/coordinator');

      dispatch({
        type: COORDINATOR_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Login Coordinator
  const loginCoordinator = async formData => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth/coordinator', formData, config);

      dispatch({
        type: LOGIN_COORDINATOR,
        payload: res.data
      });

      loadCoordinator();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <CoordinatorAuthContext.Provider
      value={{
        token: state.token,
        isCoordinator: state.isCoordinator,
        loading: state.loading,
        error: state.error,
        coordinator: state.coordinator,
        loadCoordinator,
        logout,
        clearErrors,
        loginCoordinator
      }}
    >
      {props.children}
    </CoordinatorAuthContext.Provider>
  );
};

export default CoordinatorAuthState;
