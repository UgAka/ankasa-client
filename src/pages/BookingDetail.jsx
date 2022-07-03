import React from 'react';
// import ETicket from '../components/ETicket/ETicket';
// import ETicket1 from '../components/ETicket/ETicket1';
import ETicket2 from '../components/ETicket/ETicket2';
import { Helmet } from "react-helmet";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import style from '../assets/styles/booking-detail';
import '../assets/styles/booking-detail.css';

const BookingDetail = () => {
    return (
      <div>
        <Navbar />
        <Helmet>
          <style>{"body { background-color: #2395FF; }"}</style>
        </Helmet>
        <ETicket2 />
        <div style={style.footerBackground}>
          <Footer />
        </div>
      </div>
    );
};

export default BookingDetail;