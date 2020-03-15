import {
  GET_TOWNS,
  ADD_TOWN,
  DELETE_TOWN,
  SET_TOWN_CURRENT,
  CLEAR_TOWN_CURRENT,
  UPDATE_TOWN,
  GET_TOWN_PROVINCE
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_TOWNS:
      return {
        ...state,
        towns: action.payload,
        loading: false
      };
    case ADD_TOWN:
      return {
        ...state,
        towns: [...state.towns, action.payload],
        loading: false
      };
    case UPDATE_TOWN:
      return {
        ...state,
        towns: state.towns.map(town =>
          town._id === action.payload._id ? action.payload : town
        ),
        loading: false
      };
    case DELETE_TOWN:
      return {
        ...state,
        towns: state.towns.filter(town => town._id !== action.payload),
        loading: false
      };
    case SET_TOWN_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case GET_TOWN_PROVINCE:
      return {
        ...state,
        townsOfProvince: action.payload,
        loading: false
      };
    case CLEAR_TOWN_CURRENT:
      return {
        ...state,
        current: null
      };

    default:
      return state;
  }
};
