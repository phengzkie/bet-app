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

export default (state, action) => {
  switch (action.type) {
    case GET_COLLECTORS:
      return {
        ...state,
        collectors: action.payload,
        loading: false
      };
    case GET_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case ADD_COLLECTOR:
      return {
        ...state,
        collectors: [...state.collectors, action.payload],
        loading: false
      };
    case UPDATE_COLLECTOR:
      return {
        ...state,
        collectors: state.collectors.map(collector =>
          collector._id === action.payload._id ? action.payload : collector
        ),
        loading: false
      };
    case DELETE_COLLECTOR:
      return {
        ...state,
        collectors: state.collectors.filter(
          collector => collector._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_COLLECTOR:
      return {
        ...state,
        collectors: null,
        error: null,
        current: null
      };
    case SET_COLLECTOR_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_COLLECTOR_CURRENT:
      return {
        ...state,
        current: null
      };
    case COLLECTOR_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
