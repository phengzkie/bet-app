import React, { useReducer } from 'react';
import StationContext from './stationContext';
import stationReducer from './stationReducer';
import axios from 'axios';
import {
  GET_STATIONS,
  ADD_STATION,
  DELETE_STATION,
  SET_STATION_CURRENT,
  CLEAR_STATION_CURRENT,
  UPDATE_STATION,
  STATION_ERROR,
  GET_STATION_TOWN
} from '../types';

const StationState = props => {
  const initialState = {
    stations: [],
    current: null,
    stationsOfTown: []
  };

  const [state, dispatch] = useReducer(stationReducer, initialState);

  // Get Stations
  const getStations = async () => {
    try {
      const res = await axios.get('/api/stations');

      dispatch({
        type: GET_STATIONS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: STATION_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Get Stations of a town
  const getStationsOfTown = async town => {
    try {
      const res = await axios.get(`/api/stations/${town}`);

      dispatch({
        type: GET_STATION_TOWN,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: STATION_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Station
  const addStation = async station => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/stations', station, config);

      dispatch({
        type: ADD_STATION,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: STATION_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Station
  const deleteStation = async id => {
    try {
      await axios.delete(`/api/stations/${id}`);

      dispatch({
        type: DELETE_STATION,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: STATION_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Set Current Station
  const setStationCurrent = station => {
    dispatch({ type: SET_STATION_CURRENT, payload: station });
  };

  // Clear Current Station
  const clearStationCurrent = () => {
    dispatch({ type: CLEAR_STATION_CURRENT });
  };

  // Update Station
  const updateStation = async station => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/stations/${station._id}`,
        station,
        config
      );

      dispatch({
        type: UPDATE_STATION,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: STATION_ERROR,
        payload: err.response.msg
      });
    }
  };

  return (
    <StationContext.Provider
      value={{
        stations: state.stations,
        current: state.current,
        stationsOfTown: state.stationsOfTown,
        getStations,
        addStation,
        deleteStation,
        setStationCurrent,
        clearStationCurrent,
        updateStation,
        getStationsOfTown
      }}
    >
      {props.children}
    </StationContext.Provider>
  );
};

export default StationState;
