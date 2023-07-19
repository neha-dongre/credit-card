import React, { useState } from 'react';

const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState({});

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleCvcChange = (e) => {
    setCvc(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!name) {
      validationErrors.name = 'Cardholder name required';
    }

    if (!number) {
      validationErrors.number = 'Card number required';
    } else if (!/^\d+(\s\d+)*$/.test(number)) {
      validationErrors.number = 'Wrong format, numbers only';
    }

    if (!month || !year) {
      validationErrors.expDate = 'Expiration date required';
    } else if (parseInt(month) > 12) {
      validationErrors.expDate = 'Month input must not be greater than 12!';
    }

    if (!cvc) {
      validationErrors.cvc = 'CVC required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle successful submission
      // Reset form and show success message
      setName('');
      setNumber('');
      setMonth('');
      setYear('');
      setCvc('');
      setErrors({});
      alert('Form submitted successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Cardholder Name</label>
        <input
          type="text"
          id="name"
          placeholder="e.g. Jane Appleseed"
          maxLength="25"
          autoComplete="off"
          value={name}
          onChange={handleNameChange}
        />
        {errors.name && <span className="info-err">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="card-number">Card Number</label>
        <input
          type="text"
          id="card-number"
          placeholder="e.g. 1234 5678 9123 0000"
          maxLength="19"
          autoComplete="off"
          value={number}
          onChange={handleNumberChange}
        />
        {errors.number && <span className="info-err">{errors.number}</span>}
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
              value={month}
              onChange={handleMonthChange}
            />
            <input
              type="text"
              id="year"
              placeholder="YY"
              maxLength="2"
              autoComplete="off"
              value={year}
              onChange={handleYearChange}
            />
          </div>
          {errors.expDate && <span className="info-err">{errors.expDate}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="cvc">CVC</label>
          <input
            id="cvc"
            type="text"
            placeholder="e.g. 123"
            maxLength="3"
            autoComplete="off"
            value={cvc}
            onChange={handleCvcChange}
          />
          {errors.cvc && <span className="info-err">{errors.cvc}</span>}
        </div>
      </div>
      <button type="submit" className="btn">
        Confirm
      </button>
    </form>
  );
};

export default Form;
