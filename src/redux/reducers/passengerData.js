import { SET_PASSENGER_DATA } from "../actions/types";

const initialState = {
  child: 0,
  adult: 0,
};

const listAirlineReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PASSENGER_DATA:
      return { ...action.payload };
    default:
      return state;
  }
};

export default listAirlineReducer;
