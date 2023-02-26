/*
import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { expandMenu, collapseMenu } from '../features/other/burgerMenuSlice';

import '../public/css/burgerMenu.css';

function BurgerMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isExpanded = useSelector((state) => state.burgerMenu.isExpanded);

  function handleProfilePictureClick() {
    // Handle profile picture button click here
  }

  function handleMouseEnter() {
    dispatch(expandMenu());
  }

  function handleMouseLeave() {
    dispatch(collapseMenu());
  }

  return (
    <div
      className="burger-menu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="burgerBtn">
        <FaBars />
      </button>
      {isExpanded && (
        <div className="side-nav">
          <a href="#">Profile</a>
          <a href="#">Change Password</a>
          <a href="#">Bill</a>
          <hr />
          <a href="#">Setting</a>

        </div>
      )}
    </div>
  );
} */

import { slide as Menu } from 'react-burger-menu';

function BurgerMenu() {
  const showSettings = (event) => {
    event.preventDefault();
  };
  return (
    <Menu>
      <a id="home" className="menu-item" href="/">
        Home
      </a>
      <a id="about" className="menu-item" href="/about">
        About
      </a>
      <a id="contact" className="menu-item" href="/contact">
        Contact
      </a>
      <a onClick={showSettings} className="menu-item--small" href="">
        Settings
      </a>
    </Menu>
  );
}

export default BurgerMenu;
