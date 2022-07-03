import "../assets/styles/ticket-detail.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailProduct, postTransactions } from "../redux/actions/product";
import moment from "moment";
import { getDetailUser } from "../redux/actions/user";
import { AiFillStar } from "react-icons/ai";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SET_PASSENGER_DATA } from "../redux/actions/types";
import Swal from 'sweetalert2';

export default function TicketDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlParams = useParams();
  const { detailProduct, detailUser, passenger } = useSelector(
    (state) => state
  );
  const [form, setForm] = useState({
    passenger_name: "",
    passenger_phone: "",
  });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Flight Detail`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getDetailProduct(urlParams.id, navigate));
    dispatch(getDetailUser(localStorage.getItem("id"), navigate));
  }, [dispatch, navigate, urlParams.id]);

  const sameAsCP = () => {
    setForm({
      passenger_name: detailUser.data.name,
      passenger_phone: detailUser.data.phone,
    });
  };

  const bookingTicket = async (direct = false) => {
    if (parseInt(passenger.adult)) {
      const adult = parseInt(passenger.adult);
      const child = passenger.child === "" ? 0 : parseInt(passenger.child);

      setIsLoading(true);
      const transactionStatus = await postTransactions(
        urlParams.id,
        {
          totalOrder: adult + child,
          airline_id: detailProduct.data.airline_id,
          is_paid: direct,
          ...form,
        },
        setErrors
      );

      if (transactionStatus) {
        navigate("/mybooking");
      }

      setIsLoading(false);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'There must be an adult passenger',
      })
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid p-0">
        <div className="andry-fd">
          <header>
            <div className="row">
              {/* clear */}
              <div className="col-8 d-none d-lg-block">
                <h5 className="fw-bold text-white">Contact Person Details</h5>
                <div
                  className="bg-white p-5 mt-4"
                  style={{ borderRadius: "10px" }}
                >
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="form-control input-hd"
                        id="name"
                        readOnly
                        value={detailUser.data.name}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="text"
                        placeholder="Email"
                        className="form-control input-hd"
                        id="email"
                        readOnly
                        value={detailUser.data.email}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="Phone Number"
                        className="form-control input-hd"
                        id="phone"
                        readOnly
                        value={detailUser.data.phone}
                      />
                    </div>
                    <div className="alert alert-danger">
                      <div className="d-flex align-items-center">
                        <svg
                          width="22"
                          height="20"
                          viewBox="0 0 22 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.3998 18.0625L11.6498 1.1875C11.5045 0.936719 11.2537 0.8125 11.0006 0.8125C10.7475 0.8125 10.4943 0.936719 10.3514 1.1875L0.601375 18.0625C0.313094 18.5641 0.674031 19.1875 1.25059 19.1875H20.7506C21.3272 19.1875 21.6881 18.5641 21.3998 18.0625ZM10.2506 7.75C10.2506 7.64687 10.335 7.5625 10.4381 7.5625H11.5631C11.6662 7.5625 11.7506 7.64687 11.7506 7.75V12.0625C11.7506 12.1656 11.6662 12.25 11.5631 12.25H10.4381C10.335 12.25 10.2506 12.1656 10.2506 12.0625V7.75ZM11.0006 16C10.7062 15.994 10.4259 15.8728 10.2198 15.6625C10.0137 15.4522 9.89832 15.1695 9.89832 14.875C9.89832 14.5805 10.0137 14.2978 10.2198 14.0875C10.4259 13.8772 10.7062 13.756 11.0006 13.75C11.295 13.756 11.5753 13.8772 11.7814 14.0875C11.9874 14.2978 12.1029 14.5805 12.1029 14.875C12.1029 15.1695 11.9874 15.4522 11.7814 15.6625C11.5753 15.8728 11.295 15.994 11.0006 16Z"
                            fill="#F24545"
                          />
                        </svg>
                        <span className="ms-3">
                          Make sure the customer data is correct.
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
                <br />
                <br />
                <h5 className="fw-bold">Passenger Details</h5>
                {errors.length > 0 && (
                  <div className="alert alert-danger mx-0">
                    <ul className="m-0">
                      {errors.map((error, index) => (
                        <li key={index}>{error.msg}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div
                  className="bg-white p-5 mt-4"
                  style={{ borderRadius: "10px" }}
                >
                  <div className="alert alert-info mb-4">
                    <div className="d-flex justify-content-between">
                      <p>
                        Passenger:{" "}
                        {passenger.adult === ""
                          ? 0
                          : parseInt(passenger.adult) +
                            parseInt(passenger.child)}
                      </p>
                      <div className="d-flex">
                        <p>Same as contact person</p>
                        <div
                          className="form-check form-switch ms-4"
                          style={{ transform: "scale(1.5)" }}
                        >
                          <input
                            className="form-check-input"
                            onChange={sameAsCP}
                            type="checkbox"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="form-control input-hd"
                        value={form.passenger_name}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            passenger_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="Phone Number"
                        className="form-control input-hd"
                        value={form.passenger_phone}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            passenger_phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="mb-3 me-1">
                          <label htmlFor="phone" className="form-label">
                            Adult
                          </label>
                          <input
                            type="number"
                            placeholder="Adult Passenger"
                            className="form-control input-hd"
                            id="adult"
                            min={1}
                            max={detailProduct.data.stock - passenger.child}
                            onChange={(e) =>
                              dispatch({
                                type: SET_PASSENGER_DATA,
                                payload: {
                                  child: passenger.child,
                                  adult: e.target.value,
                                },
                              })
                            }
                            value={passenger.adult}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-3 ms-1">
                          <label htmlFor="phone" className="form-label">
                            Child
                          </label>
                          <input
                            type="number"
                            placeholder="Child Passenger"
                            className="form-control input-hd"
                            id="child"
                            min={0}
                            max={detailProduct.data.stock - passenger.adult}
                            onChange={(e) =>
                              dispatch({
                                type: SET_PASSENGER_DATA,
                                payload: {
                                  adult: passenger.adult,
                                  child: e.target.value,
                                },
                              })
                            }
                            value={passenger.child}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <br />
                <div className="d-flex justify-content-center">
                  {isLoading ? (
                    <button
                      className="btn btn-success btn-lg mx-2"
                      type="button"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>{" "}
                      Loading...
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => bookingTicket()}
                        className="btn btn-primary btn-lg me-2"
                      >
                        <b>Booking</b>
                      </button>
                      <button
                        onClick={() => bookingTicket(true)}
                        className="btn btn-success btn-lg ms-2"
                      >
                        <b>Direct Buy</b>
                      </button>
                    </>
                  )}
                </div>
                <br />
              </div>
              {/* clear */}
              <div className="col-4 d-none d-lg-block">
                <div className="d-flex justify-content-between text-white">
                  <h5 className="fw-bold">Flight Details</h5>
                  <p>View Details</p>
                </div>
                {detailProduct.data.id && (
                  <div
                    className="bg-white px-4 py-5 mt-3 text-dark"
                    style={{ borderRadius: "10px" }}
                  >
                    <div>
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${
                          detailProduct.data.photo || "ticket.jpg"
                        }`}
                        height={"80px"}
                        alt=""
                      />
                      <span className="ms-3">{detailProduct.data.name}</span>
                    </div>
                    <br />
                    <div className="d-flex">
                      <h5 className="me-3">
                        <b>{detailProduct.data.origin}</b>
                      </h5>
                      <svg
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.5559 15.6H0.475875C0.213001 15.6 8.45316e-05 15.8685 8.45316e-05 16.2V17.4C8.45316e-05 17.7315 0.213001 18 0.475875 18H18.5559C18.8188 18 19.0317 17.7315 19.0317 17.4V16.2C19.0317 15.8685 18.8188 15.6 18.5559 15.6ZM2.39539 11.5977C2.58214 11.8542 2.84442 11.9997 3.11889 11.9993L7.00074 11.9926C7.30709 11.9921 7.60904 11.9006 7.88215 11.7256L16.5344 6.1888C17.3296 5.67993 18.0424 4.95357 18.5274 4.00221C19.0718 2.93423 19.131 2.16136 18.916 1.61537C18.7016 1.069 18.1803 0.66776 17.1838 0.586011C16.2962 0.513263 15.4133 0.808008 14.6181 1.3165L11.6888 3.1911L5.18531 0.113894C5.10711 0.0474663 5.01627 0.00858352 4.92216 0.00126566C4.82806 -0.0060522 4.73412 0.0184604 4.65004 0.0722692L2.69484 1.32363C2.37755 1.5265 2.30083 2.06049 2.5411 2.39348L7.1866 6.07218L4.11746 8.0364L1.96599 6.6688C1.89187 6.62167 1.80999 6.59718 1.72698 6.59731C1.64397 6.59744 1.56215 6.62219 1.48812 6.66955L0.294777 7.43341C-0.015676 7.63216 -0.0974525 8.1504 0.129143 8.48639L2.39539 11.5977Z"
                          fill="#979797"
                        />
                      </svg>
                      <h5 className="ms-3">
                        <b>{detailProduct.data.destination}</b>
                      </h5>
                    </div>
                    <br />
                    <p>
                      <span className="me-2">
                        {moment(detailProduct.data.flight_date).format("ll")}
                      </span>
                      <svg
                        width="5"
                        height="5"
                        viewBox="0 0 5 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="2.5" cy="2.5" r="2.5" fill="#6B6B6B" />
                      </svg>
                      <span className="ms-2">12.33 - 15.21</span>
                    </p>
                    <br />
                    <hr />
                    <div className="d-flex justify-content-between">
                      <h5>Total Payment</h5>
                      <div className="d-flex">
                        <h5>
                          <span className="text-primary">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(
                              passenger.adult
                                ? detailProduct.data.price *
                                    (parseInt(passenger.adult) +
                                      parseInt(passenger.child))
                                : detailProduct.data.price
                            )}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* clear */}
              <div className="col-12 d-lg-none">
                <svg
                  width="14"
                  height="24"
                  viewBox="0 0 14 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1005 2.10051L2.90812 11.2929C2.51759 11.6834 2.51759 12.3166 2.90812 12.7071L12.1005 21.8995"
                    stroke="white"
                    strokeWidth="4"
                  />
                </svg>
                <div
                  className="bg-white mt-4 py-4 px-3"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4>{detailProduct.data.origin}</h4>
                    </div>
                    <svg
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.5559 15.6H0.475875C0.213001 15.6 8.45316e-05 15.8685 8.45316e-05 16.2V17.4C8.45316e-05 17.7315 0.213001 18 0.475875 18H18.5559C18.8188 18 19.0317 17.7315 19.0317 17.4V16.2C19.0317 15.8685 18.8188 15.6 18.5559 15.6ZM2.39539 11.5977C2.58214 11.8542 2.84442 11.9997 3.11889 11.9993L7.00074 11.9926C7.30709 11.9921 7.60904 11.9006 7.88215 11.7256L16.5344 6.1888C17.3296 5.67993 18.0424 4.95357 18.5274 4.00221C19.0718 2.93423 19.131 2.16136 18.916 1.61537C18.7016 1.069 18.1803 0.66776 17.1838 0.586011C16.2962 0.513263 15.4133 0.808008 14.6181 1.3165L11.6888 3.1911L5.18531 0.113894C5.10711 0.0474663 5.01627 0.00858352 4.92216 0.00126566C4.82806 -0.0060522 4.73412 0.0184604 4.65004 0.0722692L2.69484 1.32363C2.37755 1.5265 2.30083 2.06049 2.5411 2.39348L7.1866 6.07218L4.11746 8.0364L1.96599 6.6688C1.89187 6.62167 1.80999 6.59718 1.72698 6.59731C1.64397 6.59744 1.56215 6.62219 1.48812 6.66955L0.294777 7.43341C-0.015676 7.63216 -0.0974525 8.1504 0.129143 8.48639L2.39539 11.5977Z"
                        fill="#979797"
                      />
                    </svg>
                    <div className="text-end">
                      <h4>{detailProduct.data.destination}</h4>
                    </div>
                  </div>
                  <br />
                  <div className="d-flex justify-content-between">
                    {detailProduct.data.photo ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${detailProduct.data.photo}`}
                        height={"80px"}
                        alt=""
                      />
                    ) : (
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAHlBMVEXk5uzy8/bq7PDm6O3v8PTw8fXl5+zt7vPp6+/p6vCoGyXMAAADbUlEQVR4nO2c23aDIBAAVUzV///h1qQqNxMVIe4689ZzrHSnsguIVBUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABciD4f5tuxHWOoc9J9O7wjtFmV1PXj2wHu55FZyR/S+k/up0SglK6Ekrr+dph7yJteFyQl2kJKJPUe8/8XP4YmE1PfbL4d6mYmJ232FoZsLZwNTkJwErLuZHiOW7r+rBZGJ0Py3Uqw5qSf68UjsWDYTtq6/Um7WwlWnDR2FU2rGLaTLl1xAeJOHCWJUjwnAgYqUSfB2DYljMDJ5WfJUSe+kqSqFDi5vJSYk8gUKOFBCZ1cfe4TcxKZKSdklIiTi0+SY04ia0wJnSfm5NppNuYkVJKSAnCy3oJsJ/SdMOhjOdasXKPDiQmdbAjisXKRDidh59nQdcZZ9NsWhDsJHpTP93mO86JjMSVO/JHs51UPs36hFieulE3JZPWBUuPEKj7dhlWg+VViJPEoclJVfde225YereWW8HpVTjazrFPGes89nTilO5gF3NKJN5rxh7N3dBLMBLyAb+Gkd56EcFHO6z13cGKc7hGZG3nD2Ts4Ga/unZ8CnJBv4OSVUScpK/u+Yi3oddJaEQbvxmZiKw9qnSwSxrCcwZqDtYlAuxO7yJi3+77CFpQ6cZ+Lt5tIl/vpdhKru6s0/m/pdLJHyRK3aic7t6BPw1nNTnZvQW/cFhQ6WRuKvME4Lehzsj4UeYPTgjonu0rOTGf/qnwn3sL0ISWvaZEaJ727PfGgkmeaVeOkdlbgD3/1pMnJcygySzn+1ZMiJ+0SUXWoCutzMtghHavC2pxYdbc7WoW1ObGDak3Sh7ZanJz5aa0SJwkZVauTlIz62ckkXJaTU5XocHLy0QUanJx9dIECJ6fmVx1OTHs2/lqBPCd5W8BJ2AJOwhZwErYgx8k8SMt1qNJ8X0FOSp2T83yxIcRJmSOm/t9rTP+AqzspcRTZ9PZ4mmFe3slPCSmvpqT0napA95n2GAhycv5Ex2XenzPJl+Bk3BydDevlWS3KSREanATUOPGw3hTJcWLy5ZQ/7IovyEm2wuNx9YNybAodm7rhe+ULUUaJnNMwR4r0nnxLNXkoIEWakip/9xGoJHeilZVLZky2I4cbUQUHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAP7/bFScErBag4wAAAABJRU5ErkJggg=="
                        height={"80px"}
                        alt=""
                      />
                    )}
                    <p>
                      <span className="text-warning">
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                      </span>
                      <AiFillStar />
                      <AiFillStar />
                    </p>
                  </div>
                  <div className="d-flex justify-content-between my-4">
                    <div>
                      <p className="text-secondary">Code</p>
                      <p>{detailProduct.data.code}</p>
                    </div>
                    <div>
                      <p className="text-secondary">Type</p>
                      <p>
                        {detailProduct.data.type &&
                          detailProduct.data.type[0].toUpperCase() +
                            detailProduct.data.type.slice(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-secondary">Terminal</p>
                      <p>{detailProduct.data.terminal}</p>
                    </div>
                    <div>
                      <p className="text-secondary">Gate</p>
                      <p>{detailProduct.data.gate}</p>
                    </div>
                  </div>
                  <hr />
                  <strong>{detailProduct.data.name}</strong>
                </div>
                <div
                  className="bg-white mt-4 p-4"
                  style={{ borderRadius: "10px" }}
                >
                  <h2>Passenger Details</h2>
                  {errors.length > 0 && (
                    <div className="alert alert-danger mx-0">
                      <ul className="m-0">
                        {errors.map((error, index) => (
                          <li key={index}>{error.msg}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="alert alert-info mb-4 mt-3">
                    <div className="d-flex">
                      <p>Same as contact person</p>
                      <div
                        className="form-check form-switch ms-4"
                        style={{ transform: "scale(1.5)" }}
                      >
                        <input
                          className="form-check-input"
                          onChange={sameAsCP}
                          type="checkbox"
                        />
                      </div>
                    </div>
                  </div>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="form-control input-hd"
                        value={form.passenger_name}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            passenger_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="Phone Number"
                        className="form-control input-hd"
                        value={form.passenger_phone}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            passenger_phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="mb-3 me-1">
                          <label htmlFor="phone" className="form-label">
                            Adult
                          </label>
                          <input
                            type="number"
                            placeholder="Adult Passenger"
                            className="form-control input-hd"
                            id="adult"
                            min={1}
                            max={detailProduct.data.stock - passenger.child}
                            onChange={(e) =>
                              dispatch({
                                type: SET_PASSENGER_DATA,
                                payload: {
                                  child: passenger.child,
                                  adult: e.target.value,
                                },
                              })
                            }
                            value={passenger.adult}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-3 ms-1">
                          <label htmlFor="phone" className="form-label">
                            Child
                          </label>
                          <input
                            type="number"
                            placeholder="Child Passenger"
                            className="form-control input-hd"
                            id="child"
                            min={0}
                            max={detailProduct.data.stock - passenger.adult}
                            onChange={(e) =>
                              dispatch({
                                type: SET_PASSENGER_DATA,
                                payload: {
                                  adult: passenger.adult,
                                  child: e.target.value,
                                },
                              })
                            }
                            value={passenger.child}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <p>Total you'll pay</p>
                  <h3>
                    <span className="text-primary mt-3">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(
                        passenger.adult
                          ? detailProduct.data.price *
                              (parseInt(passenger.adult) +
                                parseInt(passenger.child))
                          : detailProduct.data.price
                      )}
                    </span>
                  </h3>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  {isLoading ? (
                    <button
                      className="btn btn-success btn-lg mx-2"
                      type="button"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>{" "}
                      Loading...
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => bookingTicket()}
                        className="btn btn-primary btn-lg me-2"
                      >
                        <b>Booking</b>
                      </button>
                      <button
                        onClick={() => bookingTicket(true)}
                        className="btn btn-success btn-lg ms-2"
                      >
                        <b>Direct Buy</b>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
      <Footer />
    </>
  );
}
