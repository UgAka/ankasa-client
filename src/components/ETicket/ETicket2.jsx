import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailUser } from "../../redux/actions/user";
import { getBookingDetails } from "../../redux/actions/transaction";
import { Row, Col, Card, CardTitle } from 'reactstrap';
import style from '../../assets/styles/booking-detail';
import '../../assets/styles/booking-detail.css';

import vector from '../../assets/images/Vector1.svg';
import barcode from '../../assets/images/Group923.svg';

const ETicket = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const urlParams = useParams();
    const { detailBooking } = useSelector(
      (state) => state
    );

    useEffect(() => {
      document.title = `${process.env.REACT_APP_APP_NAME} - Booking Detail`;
      window.scrollTo(0, 0);
    }, []);
  
    useEffect(() => {
      dispatch(getBookingDetails(urlParams.id, navigate));
      dispatch(getDetailUser(localStorage.getItem("id"), navigate));
    }, [dispatch, navigate, urlParams.id]);

    return (
      <div>
        <Card body style={style.card}>
          <Row>
            <Col xs="6">
              <CardTitle tag="h1" className='booking'>
                <b>Booking Pass</b>
              </CardTitle>
            </Col>
            <Col xs="6">
              <CardTitle tag="h1" className='booking text-end'>
                <span className="threedots" />
              </CardTitle>
            </Col>
          </Row>
          <Row>
            <Col xs="2" className="border">
              <Row className="py-2">
                <Col className="text-center">
                  {
                      !detailBooking.data.photo && (
                      <>
                        <img src={`${process.env.REACT_APP_API_URL}/ticket.jpg`} alt='airline'
                         width='186' height='100'/>
                      </>
                     )

                    
                  }
                  {
                     detailBooking.data.photo && (
                      <>
                        <img src={`${process.env.REACT_APP_API_URL}/${detailBooking.data.photo}`} alt='airline'
                        width='186' height='100'/>
                      </>
                       
                    )
                  }
                 
                </Col>
              </Row>
              <Row className="py-2">
                <Col tag="h3" className="text-center" style={style.origin}>
                  <b>{detailBooking.data.origin}</b>
                </Col>
              </Row>
              <Row className="py-2">
                <Col className="text-center" style={style.origin}>
                  <img src={vector} alt='vector' width='38' height='37'/>
                </Col>
              </Row>
              <Row className="py-2">
                <Col tag="h3" className="text-center" style={style.origin}>
                  <b>{detailBooking.data.destination}</b>
                </Col>
              </Row>
            </Col>
            <Col xs="8" className="border text-center">
              <Row className="py-4">
                <Col
                  className="justify-content-center"
                >
                  <div className="py-3">
                    <Row className="text-start">
                      <Col className="form-data" xs="6">
                        Passenger
                      </Col>
                      <Col className="form-data" xs="6">
                        Class
                      </Col>
                    </Row>
                    <Row className="text-start">
                      <Col className="ticket-data" xs="6">
                        {detailBooking.data.passenger_name}
                      </Col>
                      <Col className="ticket-data" xs="6">
                        {detailBooking.data.type}
                      </Col>
                    </Row>
                  </div>
                  <div className="py-3">
                    <Row className="text-start">
                      <Col className="form-data" xs="6">
                        Departure
                      </Col>
                      <Col className="form-data" xs="6">
                        Time
                      </Col>
                    </Row>
                    <Row className="text-start">
                      <Col className="ticket-data" xs="6">
                        {moment(detailBooking.data.flight_date).format("ll")}
                      </Col>
                      <Col className="ticket-data" xs="6">
                        {moment(detailBooking.data.flight_date).format("LT")}
                      </Col>
                    </Row>
                  </div>
                  <div className="py-3">
                    <Row className="text-start">
                      <Col className="form-data" xs="6">
                        Code
                      </Col>
                      <Col className="form-data" xs="6">
                        Terminal
                      </Col>
                    </Row>
                    <Row className="text-start">
                      <Col className="ticket-data" xs="6">
                        {detailBooking.data.code}
                      </Col>
                      <Col className="ticket-data" xs="6">
                        {detailBooking.data.terminal}
                      </Col>
                    </Row>
                  </div>
                  <div className="py-3">
                    <Row className="text-start">
                      <Col className="form-data" xs="6">
                        Gate
                      </Col>
                      <Col className="form-data" xs="6">
                        Seat
                      </Col>
                    </Row>
                    <Row className="text-start">
                      <Col className="ticket-data" xs="6">
                        {detailBooking.data.gate}
                      </Col>
                      <Col className="ticket-data" xs="6">
                        21 B
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs="2" className="border">
              <Row className="py-5">
                <Col
                  className="text-center"
                  md="2"
                  style={style.barcode1}
                >
                  <img src={barcode} alt='barcode'/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    );
};

export default ETicket;