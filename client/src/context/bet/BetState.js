import React, { useReducer } from 'react';
import axios from 'axios';
import BetContext from './betContext';
import betReducer from './betReducer';
import {
  GET_BETS,
  UPDATE_BET,
  BET_ERROR,
  GET_COLLECTOR_DATA,
  GET_COLLECTOR_ID,
  TOTAL_AMOUNT,
  TOTAL_NET,
  COORDINATOR_DEDUCTION,
  LOGOUT,
  PROVINCE_TOTAL,
  GET_STATION_DATA,
  GET_TOWN_DATA,
  GET_PROVINCE_DATA,
  GET_OVERALL_DATA,
  CLEAR_DATA,
  GET_RESULT,
  GET_PAYOUT,
  SET_PAYOUT
} from '../types';

import getDateToday from '../../functions/getDate';

const BetState = props => {
  const initialState = {
    bets: [],
    result: null,
    payout: null,
    collectorData: null,
    coordinatorTotal: 0,
    coordinatorPay: 0,
    totalNet: 0,
    error: null,
    collectorID: null,
    stationTotal: 0,
    stationNet: 0,
    townTotal: 0,
    townNet: 0,
    provinceTotal: 0,
    stationData: null,
    townData: null,
    provinceData: null,
    update: null,
    overAllData: null
  };

  const [state, dispatch] = useReducer(betReducer, initialState);

  // Get Bets
  const getBets = async () => {
    try {
      const res = await axios.get(`/api/bets`);

      dispatch({
        type: GET_BETS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BET_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Get Overall Data
  const getOverAllData = async () => {
    try {
      const res = await axios.get(`api/total`);

      dispatch({
        type: GET_OVERALL_DATA,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BET_ERROR,
        payload: err.response.msg
      });
    }
  };

  const updateBet = async (game, location) => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    try {
      const res = await axios.post(
        `/api/bets/${game.type}`,
        game,
        location,
        config
      );

      dispatch({
        type: UPDATE_BET,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BET_ERROR,
        payload: err.response.msg
      });
    }
  };

  const getBetsToday = async id => {
    try {
      const res = await axios.get(`/api/bets/${id}/${getDateToday()}`);

      dispatch({
        type: GET_BETS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BET_ERROR,
        payload: err.response.msg
      });
    }
  };

  const getResult = async id => {
    try {
      const res = await axios.get(`/api/bets/result/${id}`);

      dispatch({
        type: GET_RESULT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BET_ERROR,
        payload: err.response.msg
      });
    }
  };

  const getPayout = async () => {
    try {
      const res = await axios.get(`/api/bets/payout/`);

      dispatch({
        type: GET_PAYOUT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BET_ERROR,
        payload: err.response.msg
      });
    }
  };

  const payOutPaid = async id => {
    try {
      const res = await axios.put(`/api/bets/payout/${id}`);

      console.log(res);

      dispatch({
        type: SET_PAYOUT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: BET_ERROR,
        payload: err.response.msg
      });
    }
  };

  const getCollectorData = async (id, collector) => {
    try {
      const res = await axios.get(
        `/api/bets/${id}/${getDateToday()}/${collector}`
      );

      dispatch({
        type: GET_COLLECTOR_DATA,
        payload: res.data
      });

      dispatch({
        type: GET_COLLECTOR_ID,
        payload: res.data.collectorID
      });
    } catch (err) {
      // dispatch({
      //   type: BET_ERROR,
      //   payload: err.response.msg
      // });
      console.log('collector', err);
    }
  };

  const getTotalAmountCollected = async (id, date) => {
    try {
      const res = await axios.get(`/api/bets/data/${id}/${date}`);

      dispatch({
        type: TOTAL_AMOUNT,
        payload: res.data.totalAmount === 0 ? 0 : res.data.totalAmount
      });

      dispatch({
        type: COORDINATOR_DEDUCTION,
        payload: getDeductionPay(
          res.data.totalAmount === 0 ? 0 : res.data.totalAmount,
          res.data.percentage
        )
      });

      dispatch({
        type: TOTAL_NET,
        payload:
          res.data.totalAmount === 0
            ? 0
            : res.data.totalAmount -
              getDeductionPay(
                res.data.totalAmount === 0 ? 0 : res.data.totalAmount,
                res.data.percentage
              )
      });
    } catch (err) {
      dispatch({
        type: BET_ERROR,
        payload: err.response.msg
      });
    }
  };

  const getProvinceTotal = async name => {
    try {
      const res = await axios.get(`/api/total/province/${name}`);

      dispatch({
        type: PROVINCE_TOTAL,
        payload: res.data.totalAmount === 0 ? 0 : res.data.totalAmount
      });
    } catch (err) {
      dispatch({
        type: BET_ERROR,
        payload: err.response.msg
      });
    }
  };

  const getStationData = async (id, date) => {
    try {
      const res = await axios.get(`/api/total/station/${id}/${date}`);

      dispatch({
        type: GET_STATION_DATA,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BET_ERROR,
        payload: err.response.msg
      });
    }
  };

  const getTownData = async (id, date) => {
    try {
      const res = await axios.get(`/api/total/town/${id}/${date}`);

      dispatch({
        type: GET_TOWN_DATA,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BET_ERROR,
        payload: err.response.msg
      });
    }
  };

  const getProvinceData = async (id, date) => {
    try {
      const res = await axios.get(`/api/total/province/${id}/${date}`);

      dispatch({
        type: GET_PROVINCE_DATA,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BET_ERROR,
        payload: err.response.msg
      });
    }
  };

  const clearData = () => dispatch({ type: CLEAR_DATA });

  const onLogout = () => dispatch({ type: LOGOUT });

  const getDeductionPay = (total, percentage) => {
    return total * (percentage / 100);
  };

  return (
    <BetContext.Provider
      value={{
        bets: state.bets,
        error: state.error,
        result: state.result,
        collectorData: state.collectorData,
        coordinatorTotal: state.coordinatorTotal,
        collectorID: state.collectorID,
        coordinatorPay: state.coordinatorPay,
        totalNet: state.totalNet,
        provinceTotal: state.provinceTotal,
        stationData: state.stationData,
        townData: state.townData,
        provinceData: state.provinceData,
        update: state.update,
        payout: state.payout,
        overAllData: state.overAllData,
        getBets,
        getBetsToday,
        getCollectorData,
        getTotalAmountCollected,
        onLogout,
        getProvinceTotal,
        getStationData,
        getTownData,
        getProvinceData,
        updateBet,
        getOverAllData,
        clearData,
        getResult,
        getPayout,
        payOutPaid
      }}
    >
      {props.children}
    </BetContext.Provider>
  );
};

export default BetState;
