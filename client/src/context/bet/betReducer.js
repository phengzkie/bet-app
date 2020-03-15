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
  GET_STATION_TOTAL,
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

export default (state, action) => {
  switch (action.type) {
    case GET_BETS:
      return {
        ...state,
        bets: action.payload,
        loading: false
      };
    case GET_OVERALL_DATA:
      return {
        ...state,
        overAllData: action.payload,
        loading: false
      };
    case GET_RESULT:
      return {
        ...state,
        result: action.payload,
        loading: false
      };
    case GET_PAYOUT:
      return {
        ...state,
        payout: action.payload,
        loading: false
      };
    case SET_PAYOUT:
      return {
        ...state,
        payout: state.payout.filter(pay => pay._id !== action.payload)
      };
    case UPDATE_BET:
      return {
        ...state,
        update: action.payload,
        loading: false
      };
    case GET_COLLECTOR_DATA:
      return {
        ...state,
        collectorData: action.payload,
        loading: false
      };
    case GET_STATION_TOTAL:
      return {
        ...state,
        stationTotal: state.stationTotal.filter(station =>
          station.stationId === action.payload.id ? action.payload : station
        )
      };
    case GET_COLLECTOR_ID:
      return {
        ...state,
        collectorID: action.payload,
        loading: false
      };
    case TOTAL_AMOUNT:
      return {
        ...state,
        coordinatorTotal: action.payload,
        loading: false
      };
    case LOGOUT:
      return {
        ...state,
        collectorTotal: 0,
        totalNet: 0,
        coordinatorTotal: 0,
        coordinatorPay: 0
      };
    case TOTAL_NET: {
      return {
        ...state,
        totalNet: action.payload,
        loading: false
      };
    }
    case COORDINATOR_DEDUCTION:
      return {
        ...state,
        coordinatorPay: action.payload,
        loading: false
      };
    case BET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case PROVINCE_TOTAL:
      return {
        ...state,
        provinceTotal: action.payload,
        loading: false
      };
    case GET_STATION_DATA:
      return {
        ...state,
        stationData: action.payload,
        loading: false
      };
    case GET_TOWN_DATA:
      return {
        ...state,
        townData: action.payload,
        loading: false
      };
    case GET_PROVINCE_DATA:
      return {
        ...state,
        provinceData: action.payload,
        loading: false
      };
    case CLEAR_DATA:
      return {
        ...state,
        provinceData: null,
        townData: null,
        stationData: null
      };
    default:
      return state;
  }
};
