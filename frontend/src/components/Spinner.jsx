import React from 'react';
import '../public/css/spinner.css';

const Spinner = () => {
  return (
    <div className="Spinner">
      <div className="Spinner__circle1"></div>
      <div className="Spinner__circle2"></div>
      <div className="Spinner__circle3"></div>
      <div className="Spinner__circle4"></div>
    </div>
  );
};

export default Spinner;
