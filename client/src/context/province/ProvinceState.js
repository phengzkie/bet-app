import React, { useReducer } from 'react';
import axios from 'axios';
import ProvinceContext from './provinceContext';
import provinceReducer from './provinceReducer';
import {
  GET_PROVINCES,
  ADD_PROVINCE,
  DELETE_PROVINCE,
  SET_PROVINCE_CURRENT,
  CLEAR_PROVINCE_CURRENT,
  UPDATE_PROVINCE,
  PROVINCE_ERROR
} from '../types';

const ProvinceState = props => {
  const initialState = {
    provinces: [],
    current: null,
    error: null
  };

  const [state, dispatch] = useReducer(provinceReducer, initialState);

  // Get Province
  const getProvinces = async () => {
    try {
      const res = await axios.get('/api/provinces');

      dispatch({
        type: GET_PROVINCES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROVINCE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Province
  const addProvince = async province => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/provinces', province, config);

      dispatch({
        type: ADD_PROVINCE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROVINCE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Province
  const deleteProvince = async id => {
    try {
      await axios.delete(`/api/provinces/${id}`);

      dispatch({
        type: DELETE_PROVINCE,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: PROVINCE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Set Current Province
  const setProvinceCurrent = province => {
    dispatch({ type: SET_PROVINCE_CURRENT, payload: province });
  };

  // Clear Current Province
  const clearProvinceCurrent = () => {
    dispatch({ type: CLEAR_PROVINCE_CURRENT });
  };
  // Update Province
  const updateProvince = async province => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/provinces/${province._id}`,
        province,
        config
      );

      dispatch({
        type: UPDATE_PROVINCE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROVINCE_ERROR,
        payload: err.response.msg
      });
    }
  };

  return (
    <ProvinceContext.Provider
      value={{
        provinces: state.provinces,
        current: state.current,
        error: state.error,
        getProvinces,
        addProvince,
        deleteProvince,
        setProvinceCurrent,
        clearProvinceCurrent,
        updateProvince
      }}
    >
      {props.children}
    </ProvinceContext.Provider>
  );
};

export default ProvinceState;
