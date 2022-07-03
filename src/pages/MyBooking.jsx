import React, { useEffect } from "react";
import "../assets/styles/mybooking.css";
import botArrow from "../assets/icons/bottom-arrow.svg";
import airplane from "../assets/icons/airplane.svg";
import { useDispatch, useSelector } from "react-redux";
import { getDetailUser } from "../redux/actions/user";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import iconProfile from "../assets/icons/icon-profile.svg";
import iconMyReview from "../assets/icons/icon-myPriview.svg";
import iconSetting from "../assets/icons/icon-setting.svg";
import iconLogout from "../assets/icons/icon-logout.svg";
import { getMyBooking } from "../redux/actions/transaction";
import { payTicket, deleteTicket } from "../redux/actions/transaction";
import Swal from "sweetalert2";

export default function MyBooking() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const detailUser = useSelector((state) => {
        return state.detailUser;
    });

    const myBooking = useSelector((state) => {
        return state.myBooking;
    });

    useEffect(() => {
        dispatch(getDetailUser(localStorage.getItem("id"), navigate));
        dispatch(getMyBooking(navigate));
    }, [dispatch, navigate]);

    const processTicket = (id) => {
        payTicket(id)
            .then((result) => {
                Swal.fire({
                    title: "Success",
                    text: "ticket has been pay",
                    icon: "success",
                });
                dispatch(getMyBooking(navigate));
            })
            .catch((err) => {
                alert(err);
            });
    };
    const cancelTicket = (id) => {
        Swal.fire({
            title: "Are you sure to cancel this ticket?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTicket(id, localStorage.getItem("id"))
                    .then((response) => {
                        Swal.fire({
                            title: "Ticket successfully canceled",
                            icon: "success",
                        });
                        dispatch(getMyBooking(navigate));
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: "Cancel ticket failed",
                            icon: "error",
                        });
                    });
            }
        });
    };

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };
    return (
        <>
            <div className="container-fluid hanifMyBooking ml-0 mr-0">
                <Navbar />
                <section className="d-flex w-100">
                    <div className="col-lg-4 col-12 side-content">
                        <div className="card d-flex flex-column w-100">
                            {detailUser.isLoading ? (
                                <div>Loading</div>
                            ) : (
                                <div className="d-flex flex-column">
                                    {!detailUser.data.photo && (
                                        <>
                                            <img
                                                width={"200px"}
                                                height={"200px"}
                                                className="card-img-top"
                                                src={`${process.env.REACT_APP_API_URL}/profile.jpg`}
                                                alt="Card cap"
                                            />
                                        </>
                                    )}
                                    {detailUser.data.photo && (
                                        <>
                                            <img
                                                width={"200px"}
                                                height={"200px"}
                                                className="card-img-top"
                                                src={`${process.env.REACT_APP_API_URL}/${detailUser.data.photo}`}
                                                alt="Card cap"
                                            />
                                        </>
                                    )}
                                    <div className="detail-profile">
                                        {<h4>{detailUser.data.name}</h4>}
                                        {<p>{detailUser.data.address}</p>}
                                    </div>
                                </div>
                            )}

                            <div className="label d-flex">
                                <div className="label-card">Cards</div>
                                <div className="add-card">+ Add</div>
                            </div>
                            <div className="credit-card d-flex flex-column">
                                <label>4441 1235 5512 5551</label>
                                <div className="detail-cc d-flex flex-row">
                                    <p className="type-card">X Card</p>
                                    <p className="balance">$ 1,440.2</p>
                                </div>
                            </div>
                            <div className="card-setting d-flex flex-column justify-content-start">
                                <div className="">
                                    <img src={iconProfile} alt="" />
                                    <label htmlFor="">Profile</label>
                                </div>
                                <div>
                                    <img src={iconMyReview} alt="" />
                                    <label htmlFor="">My Review</label>
                                </div>
                                <div>
                                    <img src={iconSetting} alt="" />
                                    <label htmlFor="">Settings</label>
                                </div>
                                <div>
                                    <button onClick={logout}>
                                        <img src={iconLogout} alt="" />
                                        <label htmlFor="">Logout</label>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-8 col-12 main-content d-flex flex-column">
                        <div className="card">
                            <h3>MY BOOKING</h3>
                            <div className="header-booking d-flex">
                                <label className="my-booking">My Booking</label>
                                <label className="order-history">Order History</label>
                            </div>
                        </div>
                        {myBooking.isLoading ? (
                            <div>Loading</div>
                        ) : (
                            myBooking.data.map((item, index) => {
                                return (
                                    <div key={index} className="card">
                                        <div className="content d-flex flex-column">
                                            <p className="date-departure">{item.flight_date}</p>
                                            <div className="destination d-flex flex-row">
                                                <h5>{item.origin}</h5>
                                                <img src={airplane} alt="" />
                                                <h5>{item.destination}</h5>
                                            </div>
                                            <p className="code-airplane">
                                                {item.name} {item.seat}
                                            </p>
                                        </div>
                                        <div className="status">
                                            <label className="label-status">Status</label>
                                            {item.is_paid && (
                                                <>
                                                    <button className="ticket-iussue">
                                                        Eticket issued
                                                    </button>
                                                </>
                                            )}

                                            {!item.is_paid && (
                                                <>
                                                    <div className="boxButton">
                                                        <button className="waiting-ticket">
                                                            Waiting for payment
                                                        </button>
                                                        <button
                                                            onClick={() => cancelTicket(item.id)}
                                                            className="cancel-ticket"
                                                        >
                                                            Cancel Ticket
                                                        </button>
                                                        <button
                                                            onClick={() => processTicket(item.id)}
                                                            className="pay-ticket"
                                                        >
                                                            Pay Ticket
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                            <Link to={`/detail/${item.id}`}>
                                            <div className="label-viewDetail">
                                                <label>View Details</label>
                                                <img src={botArrow} alt="" />
                                            </div>
                                            </Link>

                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}
