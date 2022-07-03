import { SET_PASSENGER_DATA } from "../actions/types";

export const setPassenger = (adult, child) => async (dispatch) => {
  dispatch({
    type: SET_PASSENGER_DATA,
    payload: { adult, child },
  });
};
