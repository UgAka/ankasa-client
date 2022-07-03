import React from 'react';
import '../assets/styles/circleCard.css';

export default function CircleCard(params) {
  return (
    <div className="circleCard">
      <div className="outline">
        <img src={params.src} alt="" className="img" />
      </div>
      <h4 className="titleDestination">{params.title}</h4>
    </div>
  );
}
