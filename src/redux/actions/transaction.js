import axios from "axios";
import {
    GET_MYBOOKING_PENDING,
    GET_MYBOOKING_SUCCESS,
    GET_MYBOOKING_FAILED,
    GET_DETAIL_BOOKING_PENDING,
    GET_DETAIL_BOOKING_SUCCESS,
    GET_DETAIL_BOOKING_FAILED
} from "./types";

export const getMyBooking = (navigate) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");

        dispatch({
            type: GET_MYBOOKING_PENDING,
            payload: null,
        });

        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/userTransactions`,
            {
                headers: { token },
            }
        );

        dispatch({
            type: GET_MYBOOKING_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        if (error.response) {
            if (parseInt(error.response.data.code, 10) === 401) {
                localStorage.clear();
                return navigate("/");
            }

            error.message = error.response.data.error;
        }

        dispatch({
            type: GET_MYBOOKING_FAILED,
            payload: error.message,
        });
    }
};

export const getBookingDetails = (id, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    dispatch({
      type: GET_DETAIL_BOOKING_PENDING,
      payload: null,
    });

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/detailTransactions/${id}`,
      {
        headers: { token },
      }
    );

    dispatch({
      type: GET_DETAIL_BOOKING_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    if (error.response) {
      if (parseInt(error.response.data.code, 10) === 401) {
        localStorage.clear();
        return navigate("/");
      }

      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_DETAIL_BOOKING_FAILED,
      payload: error.message,
    });
  }
};

export const payTicket = (id) => {
    const token = localStorage.getItem("token")

    return new Promise((resolve, reject) => {
        axios.put(`${process.env.REACT_APP_API_URL}/transactions/${id}/paid`, {}, {
            headers: {
                token: token
            }
        })
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
};

export const deleteTicket = (id) => {
    const token = localStorage.getItem("token")

    return new Promise((resolve, reject) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/transactions/${id}`, {
            headers: {
                token: token
            }
        })
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
};

