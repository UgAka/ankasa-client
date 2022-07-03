import { GET_OLDDESTINATION_FAILED, GET_OLDDESTINATION_PENDING, GET_OLDDESTINATION_SUCCESS } from '../actions/types';

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
};

const oldDestinationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OLDDESTINATION_PENDING:
      return { ...state, isLoading: true };
    case GET_OLDDESTINATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case GET_OLDDESTINATION_FAILED:
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

export default oldDestinationReducer;
