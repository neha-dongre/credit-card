import React, { useState } from 'react';
import './index.css';
import cardFrontImage from './images/bg-card-front.png';
import logo from './images/card-logo.svg';
import cardBackImage from './images/Group 6.svg';
import iconComplete from './images/icon-complete.svg';

function SuccessMessage({ onClose }) {
  const successMessageStyle = {
    position: 'fixed',
    top: '50%',
    left: '77%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '50px',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    zIndex: '9999',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:'400px',

  };

  return (
    <div style={successMessageStyle}>
      <img class="rightimg" src={iconComplete} alt="" aria-hidden="true" />
      <h1 class="thankyou">Thank you!</h1>
      <p class="belowthank">We've added your card details</p>
      <button className="btn" onClick={onClose}>Continue</button>
    </div>
  );
}

function App() {
  const [inputNameValue, setInputNameValue] = useState('');
  const [inputNumberValue, setInputNumberValue] = useState('');
  const [inputMonthValue, setInputMonthValue] = useState('');
  const [inputYearValue, setInputYearValue] = useState('');
  const [inputCVCValue, setInputCVCValue] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formErrors, setFormErrors] = useState({});




  const handleSuccessMessageClose = () => {
    setShowSuccessMessage(false);
  };

  const handleNameChange = (e) => {
    setInputNameValue(e.target.value);
  };

  const handleNumberChange = (e) => {
    let formatText = e.target.value;
    formatText = formatText.substring(0, 19);
    formatText = formatText
      .replace(/\s/g, '')
      .replace(new RegExp(`(.{4})`, 'g'), '$1 ')
      .trim();

    setInputNumberValue(formatText);
  };

  const handleMonthChange = (e) => {
    setInputMonthValue(e.target.value.replace(/\s/g, ''));
  };

  const handleYearChange = (e) => {
    setInputYearValue(e.target.value.replace(/\s/g, ''));
  };

  const handleCVCChange = (e) => {
    setInputCVCValue(e.target.value.replace(/\s/g, ''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation checks here
    const errors = {};

    if (!inputNameValue) {
      errors.name = 'Cardholder name is required.';
    }

    if (!inputNumberValue || !/^\d+(\s\d+)*$/.test(inputNumberValue)) {
      errors.number = 'Wrong format, numbers only.';
    }

    if (!inputMonthValue || !inputYearValue || parseInt(inputMonthValue) > 12 || inputYearValue.length !== 2) {
      errors.expiry = 'Invalid Expiry Date.';
    }

    if (!inputCVCValue || !/^\d+$/.test(inputCVCValue) || inputCVCValue.length !== 3) {
      errors.cvc = 'CVC must be 3 numbers.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      setFormSubmitted(true);
      setShowSuccessMessage(true);

      // Clear form inputs immediately
      setInputNameValue('');
      setInputNumberValue('');
      setInputMonthValue('');
      setInputYearValue('');
      setInputCVCValue('');
    }
  };
  const handleConfirm = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };
  return (
    <div className="App">
      <main>
        <div className="card">
          <div className="card-back">
            <img src={cardBackImage} alt="Card Back" />
            <div className="cvc">
              <span>{inputCVCValue || '000'}</span>
            </div>
          </div>
          <div className="card-front">
            <img class="cardimg"src={cardFrontImage} alt="Card Front" />
            <img src={logo} alt="Card Logo" className="card-logo" />
            <div className="card-details">
              <span className="card-Number">{inputNumberValue || '0000 0000 0000 0000'}</span>
              <div className="info">
                <span className="cardholder-name">{inputNameValue || 'Jane Appleseed'}</span>
                <span className="exp-date">{inputMonthValue || 'MM'}/{inputYearValue || 'YY'}</span>
              </div>
            </div>
          </div>
        </div>
        {!showSuccessMessage ? (
        <form onSubmit={handleConfirm}>
          <div className="form-group">
            <label htmlFor="name">Cardholder Name</label>
            <input
              type="text"
              id="name"
              placeholder="e.g. Jane Appleseed"
              maxLength="25"
              autoComplete="off"
              value={inputNameValue}
              onChange={handleNameChange}
            />
            {formErrors.name && <span className="info-err d-block">{formErrors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="card-number">Card Number</label>
            <input
              type="text"
              id="card-number"
              placeholder="e.g. 1234 5678 9123 0000"
              maxLength="19"
              autoComplete="off"
              value={inputNumberValue}
              onChange={handleNumberChange}
            />
            {formErrors.number && <span className="info-err d-block">{formErrors.number}</span>}
          </div>
          <div className="form-exp-date">
            <div className="form-group">
              <label htmlFor="month">Exp. Date (MM/YY)</label>
              <div className="date">
                <input
                  type="text"
                  id="month"
                  placeholder="MM"
                  maxLength="2"
                  autoComplete="off"
                  value={inputMonthValue}
                  onChange={handleMonthChange}
                />
                <input
                  type="text"
                  id="year"
                  placeholder="YY"
                  maxLength="2"
                  autoComplete="off"
                  value={inputYearValue}
                  onChange={handleYearChange}
                />
              </div>
              {formErrors.expiry && <span className="info-err d-block">{formErrors.expiry}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="cvc">CVC</label>
              <input
                id="cvc"
                type="text"
                placeholder="e.g. 123"
                maxLength="3"
                autoComplete="off"
                value={inputCVCValue}
                onChange={handleCVCChange}
              />
              {formErrors.cvc && <span className="info-err d-block">{formErrors.cvc}</span>}
            </div>
          </div>
          <button type="submit" className="btn">Confirm</button>
        </form>
         ) : (
          <SuccessMessage onClose={handleSuccessMessageClose} />
        )}

        
      </main>
    </div>
  );
}

export default App;
