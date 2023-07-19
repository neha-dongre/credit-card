import React from 'react';
import Group6Image from './images/Group 6.svg';
import CardFrontImage from './images/bg-card-front.png';
import CardLogo from './images/card-logo.svg';

const Card = ({ name, number, expDate, cvc }) => {
  return (
    <div className="card">
      <div className="card-back">
      <img src={Group6Image} alt="" aria-hidden="true" />
        <div className="cvc">
          <span>{cvc}</span>
        </div>
      </div>
      <div className="card-front">
        <img src={CardFrontImage} alt="" aria-hidden="true" />
        <div className="card-details">
          <img src={CardLogo} alt="" aria-hidden="true" />
          <span className="card-Number">{number}</span>
          <div className="info">
            <span className="cardholder-name">{name}</span>
            <span className="exp-date">{expDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
