/* eslint-disable linebreak-style */
/* eslint-disable default-param-last */
import {
  GET_AIRLINE_FAILED,
  GET_AIRLINE_PENDING,
  GET_AIRLINE_SUCCESS,
} from '../actions/types';

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
};

const listAirlineReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AIRLINE_PENDING:
      return { ...state, isLoading: true };
    case GET_AIRLINE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
      };
    case GET_AIRLINE_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default listAirlineReducer;
