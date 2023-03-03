import React from 'react';
import '../public/css/burgerMenu.css';

const BurgerMenu = ({ isOpen, onClick }) => {
  return (
    <div className="hamburger-menu" onClick={onClick}>
      <div className={`hamburger-menu__line ${isOpen ? 'open' : ''}`} />
      <div className={`hamburger-menu__line ${isOpen ? 'open' : ''}`} />
      <div className={`hamburger-menu__line ${isOpen ? 'open' : ''}`} />
    </div>
  );
};

export default BurgerMenu;
