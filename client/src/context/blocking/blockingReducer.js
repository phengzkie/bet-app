import { ADD_BLOCKING, GET_BLOCKING, BLOCKING_ERROR } from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_BLOCKING:
      return {
        ...state,
        blockings: [...state.blockings, action.payload],
        loading: false
      };
    case GET_BLOCKING:
      return {
        ...state,
        blockings: action.payload,
        loading: false
      };
    case BLOCKING_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
