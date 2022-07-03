import React from 'react';
import '../assets/styles/cardComponents.css';
import previous from '../assets/icons/previous.svg';

export default function Card(params) {
  return (
    <div className="mediumCard">
      <img src={params.src} alt={params.alt} className="cardImage" />
      <div className="objectGradient">
        <p className="textDestination">
          {params.destination}
          ,
        </p>
        <h5 className="titleCountry">{params.country}</h5>
        <div className="boxTextAirlines">
          <div className="boxAirlines">
            <h6 className='titleAirline'>
              {params.totalAirlines}
            </h6>
            <p className='pAirline'>
              {' '}
              Airlines
            </p>
          </div>
        </div>
        <div className="from">
          <p>
            From
            {' '}
            {params.price}
          </p>
          <div className="circle">
            <img src={previous} alt="" className="iPrevious" />
          </div>
        </div>
      </div>
    </div>
  );
}
