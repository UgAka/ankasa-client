import axios from "axios";
import {
  GET_PRODUCT_PENDING,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILED,
  GET_DETAIL_PRODUCT_PENDING,
  GET_DETAIL_PRODUCT_SUCCESS,
  GET_DETAIL_PRODUCT_FAILED,
} from "./types";

export const getListProduct = (url) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    dispatch({
      type: GET_PRODUCT_PENDING,
      payload: null,
    });

    const res = await axios.get(url, {
      headers: { token },
    });

    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    if (error.response) {
      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_PRODUCT_FAILED,
      payload: error.message,
    });
  }
};

export const getDetailProduct = (id, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    dispatch({
      type: GET_DETAIL_PRODUCT_PENDING,
      payload: null,
    });

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product-detail/${id}`,
      {
        headers: { token },
      }
    );

    dispatch({
      type: GET_DETAIL_PRODUCT_SUCCESS,
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
      type: GET_DETAIL_PRODUCT_FAILED,
      payload: error.message,
    });
  }
};

export const postTransactions = async (id, data, setErrors) => {
  try {
    const token = localStorage.getItem("token");
    console.log(data);

    await axios.post(
      `${process.env.REACT_APP_API_URL}/transactions/${id}`,
      data,
      {
        headers: { token },
      }
    );

    return true;
  } catch (error) {
    if (error.response) {
      if (Array.isArray(error.response.data.error)) {
        setErrors(error.response.data.error);
      } else {
        setErrors([{ msg: error.response.data.error }]);
      }
    } else {
      setErrors([{ msg: error.message }]);
    }

    return false;
  }
};
