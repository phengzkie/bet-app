import React, { useReducer } from 'react';
import CollectorContext from './collectorContext';
import collectorReducer from './collectorReducer';
import axios from 'axios';
import {
  GET_COLLECTORS,
  ADD_COLLECTOR,
  UPDATE_COLLECTOR,
  DELETE_COLLECTOR,
  SET_COLLECTOR_CURRENT,
  CLEAR_COLLECTOR_CURRENT,
  COLLECTOR_ERROR,
  CLEAR_COLLECTOR,
  GET_DATA
} from '../types';

const CollectorState = props => {
  const initialState = {
    collectors: [],
    data: [],
    error: null,
    current: null
  };

  const [state, dispatch] = useReducer(collectorReducer, initialState);

  // Get Collectors
  const getCollectors = async () => {
    try {
      const res = await axios.get('/api/collectors');

      dispatch({
        type: GET_COLLECTORS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COLLECTOR_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Get CollectorsData
  const getCollectorsData = async date => {
    try {
      const res = await axios.get(`/api/collectors/data/${date}`);

      dispatch({
        type: GET_DATA,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COLLECTOR_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Collector
  const addCollector = async collector => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/collectors', collector, config);

      dispatch({
        type: ADD_COLLECTOR,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COLLECTOR_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Collector
  const deleteCollector = async id => {
    try {
      await axios.delete(`/api/collectors/${id}`);

      dispatch({
        type: DELETE_COLLECTOR,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: COLLECTOR_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Set Current Collector
  const setCollectorCurrent = collector => {
    dispatch({ type: SET_COLLECTOR_CURRENT, payload: collector });
  };

  // Clear Current Collector
  const clearCollectorCurrent = () => {
    dispatch({ type: CLEAR_COLLECTOR_CURRENT });
  };

  // Update Collector
  const updateCollector = async collector => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/collectors/${collector._id}`,
        collector,
        config
      );

      dispatch({
        type: UPDATE_COLLECTOR,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COLLECTOR_ERROR,
        payload: err.response.msg
      });
    }
  };

  const clearCollectors = () => {
    dispatch({ type: CLEAR_COLLECTOR });
  };

  return (
    <CollectorContext.Provider
      value={{
        collectors: state.collectors,
        current: state.current,
        error: state.error,
        data: state.data,
        addCollector,
        deleteCollector,
        updateCollector,
        getCollectors,
        clearCollectorCurrent,
        setCollectorCurrent,
        clearCollectors,
        getCollectorsData
      }}
    >
      {props.children}
    </CollectorContext.Provider>
  );
};

export default CollectorState;
