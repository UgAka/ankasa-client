import { GET_DESTINATION_PENDING, GET_DESTINATION_SUCCESS, GET_DESTINATION_FAILED } from '../actions/types';

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
};

const destinationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DESTINATION_PENDING:
      return { ...state, isLoading: true };
    case GET_DESTINATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case GET_DESTINATION_FAILED:
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

export default destinationReducer;
