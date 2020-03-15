import {
  GET_STATIONS,
  ADD_STATION,
  DELETE_STATION,
  SET_STATION_CURRENT,
  CLEAR_STATION_CURRENT,
  UPDATE_STATION,
  GET_STATION_TOWN
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_STATIONS:
      return {
        ...state,
        stations: action.payload,
        loading: false
      };
    case GET_STATION_TOWN:
      return {
        ...state,
        stationsOfTown: action.payload,
        loading: false
      };
    case ADD_STATION:
      return {
        ...state,
        stations: [...state.stations, action.payload],
        loading: false
      };
    case UPDATE_STATION:
      return {
        ...state,
        stations: state.stations.map(station =>
          station._id === action.payload._id ? action.payload : station
        ),
        loading: false
      };
    case DELETE_STATION:
      return {
        ...state,
        stations: state.stations.filter(
          station => station._id !== action.payload
        ),
        loading: false
      };
    case SET_STATION_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_STATION_CURRENT:
      return {
        ...state,
        current: null
      };

    default:
      return state;
  }
};
