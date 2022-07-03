import React from 'react';
import { Row, Col, Card, CardTitle } from 'reactstrap';
import style from '../../assets/styles/booking-detail';
import '../../assets/styles/booking-detail.css';

import vector from '../../assets/images/Vector1.svg';
import airlinesLogo from '../../assets/images/garuda-indonesia-logo-BD82882F07-seeklogo3.svg';
import qrCode from '../../assets/images/QRCode1.svg';

const ETicket = () => {
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
            <Col xs="8" className="border">
              <Row className="py-4">
                <Col className="text-center">
                  <img src={airlinesLogo} alt='airline'
                    width='186' height='100'
                  />
                </Col>
                <Col tag="h3" className="text-center" style={style.origin}>
                  <b>IDN</b>
                </Col>
                <Col className="text-center" style={style.origin}>
                  <img src={vector} alt='vector' width='38' height='37'/>
                </Col>
                <Col tag="h3" className="text-center" style={style.origin}>
                  <b>JPN</b>
                </Col>
              </Row>
              <Row className="py-4">
                <Col
                  className="justify-content-center"
                >
                  <div className="py-2">
                    <Row>
                      <Col className="form-data" xs="6">
                        Code
                      </Col>
                      <Col className="form-data" xs="6">
                        Class
                      </Col>
                    </Row>
                    <Row>
                      <Col className="ticket-data" xs="6">
                        AB-221
                      </Col>
                      <Col className="ticket-data" xs="6">
                        Economy
                      </Col>
                    </Row>
                  </div>
                  <div className="py-4">
                    <Row>
                      <Col className="form-data" xs="6">
                        Terminal
                      </Col>
                      <Col className="form-data" xs="6">
                        Gate
                      </Col>
                    </Row>
                    <Row>
                      <Col className="ticket-data" xs="6">
                        A
                      </Col>
                      <Col className="ticket-data" xs="6">
                        221
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <Row>
                      <Col className="form-data" xs="12">
                        Departure
                      </Col>
                    </Row>
                    <Row>
                      <Col className="ticket-data" xs="12">
                        Monday, 20 July ‘20 - 12:33
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs="4" className="border">
              <Row className="py-4">
                <Col
                  className="text-center"
                  md="2"
                  style={style.qrCode}
                >
                  <img src={qrCode} alt='QR-Code' width='200' height='200'/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    );
};

export default ETicket;