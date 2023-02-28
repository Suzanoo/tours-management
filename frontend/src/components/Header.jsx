import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { GiGemini } from 'react-icons/gi';
import { IoCreateOutline } from 'react-icons/io5';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

// import BurgerMenu from './BurgerMenu';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <GiGemini />
        </Link>
      </div>
      <ul>
        {user ? (
          user.data.user.role === 'admin' ? (
            <>
              <li>
                <button className="btn">
                  <IoCreateOutline /> New
                </button>

                <button className="btn" onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          )
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
