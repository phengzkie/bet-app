import React, { useReducer } from 'react';
import axios from 'axios';
import BlockingContext from './blockingContext';
import blockingReducer from './blockingReducer';

import { ADD_BLOCKING, GET_BLOCKING, BLOCKING_ERROR } from '../types';

const BlockingState = props => {
  const initialState = {
    blockings: [],
    error: null
  };

  const [state, dispatch] = useReducer(blockingReducer, initialState);

  // Get Blocking
  const getBlocking = async () => {
    const res = await axios.get('/api/blocking');

    try {
      dispatch({
        type: GET_BLOCKING,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: BLOCKING_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Blocking
  const addBlocking = async (game, location, date) => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    const res = await axios.post(
      `/api/blocking/${date}`,
      game,
      location,
      config
    );

    try {
      dispatch({
        type: ADD_BLOCKING,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: BLOCKING_ERROR,
        payload: err.response.msg
      });
    }
  };

  return (
    <BlockingContext.Provider
      value={{
        blockings: state.blockings,
        error: state.error,
        addBlocking,
        getBlocking
      }}
    >
      {props.children}
    </BlockingContext.Provider>
  );
};

export default BlockingState;
