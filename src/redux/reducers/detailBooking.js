import {
    GET_DETAIL_BOOKING_PENDING,
    GET_DETAIL_BOOKING_SUCCESS,
    GET_DETAIL_BOOKING_FAILED
} from '../actions/types';

const initialState = {
    isLoading: false,
    isError: false,
    data: [],
    error: null,
};

const detailMyBookingReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_DETAIL_BOOKING_PENDING:
          return { ...state, isLoading: true };
      case GET_DETAIL_BOOKING_SUCCESS:
          return {
              ...state,
              isLoading: false,
              isError: false,
              data: action.payload.data,
          };
      case GET_DETAIL_BOOKING_FAILED:
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

export default detailMyBookingReducer;