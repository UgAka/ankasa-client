import React from "react";
import "../assets/styles/ian.css";
import appStore from "../assets/images/app store.png";
import google from "../assets/images/google play.png"
import facebook from "../assets/icons/vector-fb.svg"
import twitter from "../assets/icons/vector-tt.svg"
import instagram from "../assets/icons/vector-ig.svg"
import youtube from "../assets/icons/vector-yt.svg"

const Footer = () => {
  return (
    <div className="ian container">
      <div className="jumbotron">
        <div className="form">
          <div className="form-title">
            <div className="icon"></div>
            <div className="text">Ankasa</div>
          </div>
          <h5>
            Find your Flight and explore the world with us. We will take care of
            the rest
          </h5>
        </div>
        <div className="form">
          <div className="form-title">
            <div className="text">Features</div>
          </div>
          <ul>
            <li>Find Ticket</li>
            <li>My Booking</li>
            <li>Chat</li>
            <li>Notification</li>
          </ul>
        </div>
        <div className="form">
          <div className="form-title">
            <div className="text">Download Angkasa app</div>
          </div>
          <div className="images">
            <img src={appStore} alt="App Store" />
            <img src={google} alt="Google Play" />
          </div>
        </div>
        <div className="form">
          <div className="form-title">
            <div className="text">Follow Us</div>
          </div>
          <div className="form-icon">
            <img src={facebook} alt="Facebook" />
            <img src={twitter} alt="Twitter" />
            <img src={instagram} alt="Instagram" />
            <img src={youtube} alt="Youtube" />
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="form-location">
          <div className="icon"></div>
          <div className="text">Jakarta Indonesia</div>
        </div>
        <small>© Ankasa. All Rights Reserved.</small>
      </div>
    </div>
  );
};
export default Footer;
