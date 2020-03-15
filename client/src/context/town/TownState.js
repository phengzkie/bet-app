import React, { useReducer } from 'react';
import TownContext from './townContext';
import townReducer from './townReducer';
import axios from 'axios';
import {
  GET_TOWNS,
  ADD_TOWN,
  DELETE_TOWN,
  SET_TOWN_CURRENT,
  CLEAR_TOWN_CURRENT,
  UPDATE_TOWN,
  TOWN_ERROR,
  GET_TOWN_PROVINCE
} from '../types';

const TownState = props => {
  const initialState = {
    towns: [],
    current: null,
    townsOfProvince: []
  };

  const [state, dispatch] = useReducer(townReducer, initialState);

  // Get Towns
  const getTowns = async () => {
    try {
      const res = await axios.get('/api/towns');

      dispatch({
        type: GET_TOWNS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: TOWN_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Get Town per Province
  const getTownOfProvince = async name => {
    try {
      const res = await axios.get(`/api/towns/${name}`);

      dispatch({
        type: GET_TOWN_PROVINCE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: TOWN_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Town
  const addTown = async town => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/towns', town, config);

      dispatch({
        type: ADD_TOWN,
        payload: res.data
      });

      console.log('res.data', res.data);
    } catch (err) {
      dispatch({
        type: TOWN_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Town
  const deleteTown = async id => {
    try {
      await axios.delete(`/api/towns/${id}`);

      dispatch({
        type: DELETE_TOWN,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: TOWN_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Set Current Town
  const setTownCurrent = town => {
    dispatch({ type: SET_TOWN_CURRENT, payload: town });
  };

  // Clear Current Province
  const clearTownCurrent = () => {
    dispatch({ type: CLEAR_TOWN_CURRENT });
  };

  // Update Province
  const updateTown = async town => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/towns/${town._id}`, town, config);

      dispatch({
        type: UPDATE_TOWN,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: TOWN_ERROR,
        payload: err.response.msg
      });
    }
  };

  return (
    <TownContext.Provider
      value={{
        towns: state.towns,
        current: state.current,
        townsOfProvince: state.townsOfProvince,
        addTown,
        getTowns,
        deleteTown,
        setTownCurrent,
        clearTownCurrent,
        updateTown,
        getTownOfProvince
      }}
    >
      {props.children}
    </TownContext.Provider>
  );
};

export default TownState;
