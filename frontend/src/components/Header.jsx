import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { logout } from '../features/auth/authSlice';
import BurgerMenu from './BurgerMenu';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">|| GEMINI ||</div>
      <ul>
        {user ? (
          <>
            <li>
              <BurgerMenu
                isOpen={menuOpen}
                onClick={handleMenuClick}
              ></BurgerMenu>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <ul>
              <li>
                <Link to="/login" className="btn">
                  <FaSignInAlt />
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn">
                  <FaUser />
                  Register
                </Link>
              </li>
            </ul>
          </>
        )}

        {/* {user ? (
          <>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
            
          </>
        ) : (
          <>
            <ul>
              <li>
                <Link to="/login">
                  <FaSignInAlt />
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser />
                  Register
                </Link>
              </li>
            </ul>
          </>
        )} */}
      </ul>
    </header>
  );
}

export default Header;
