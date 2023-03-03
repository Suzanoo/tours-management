// Dropdown.js

import React from 'react';

const Dropdown = (props) => {
  return (
    <div className={props.className}>
      <select
        value={props.selectedOption}
        onChange={(e) => props.onSelect(e.target.value)}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button
        className="btn"
        onClick={() => console.log(`Selected Option: ${props.selectedOption}`)}
      >
        Submit
      </button>
    </div>
  );
};

export default Dropdown;
