import {
    GET_MYBOOKING_PENDING,
    GET_MYBOOKING_SUCCESS,
    GET_MYBOOKING_FAILED,
} from '../actions/types';

const initialState = {
    isLoading: false,
    isError: false,
    data: [],
    error: null,
};

const listMyBookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MYBOOKING_PENDING:
            return { ...state, isLoading: true };
        case GET_MYBOOKING_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data,
            };
        case GET_MYBOOKING_FAILED:
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

export default listMyBookingReducer;