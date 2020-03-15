import {
  GET_PROVINCES,
  ADD_PROVINCE,
  UPDATE_PROVINCE,
  DELETE_PROVINCE,
  SET_PROVINCE_CURRENT,
  CLEAR_PROVINCE_CURRENT,
  PROVINCE_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_PROVINCES:
      return {
        ...state,
        provinces: action.payload,
        loading: false
      };
    case ADD_PROVINCE:
      return {
        ...state,
        provinces: [...state.provinces, action.payload],
        loading: false
      };
    case UPDATE_PROVINCE:
      return {
        ...state,
        provinces: state.provinces.map(province =>
          province._id === action.payload._id ? action.payload : province
        ),
        loading: false
      };
    case DELETE_PROVINCE:
      return {
        ...state,
        provinces: state.provinces.filter(
          province => province._id !== action.payload
        ),
        loading: false
      };
    case SET_PROVINCE_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_PROVINCE_CURRENT:
      return {
        ...state,
        current: null
      };
    case PROVINCE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
