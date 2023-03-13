import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

import logo from '../public/img/logo.png';

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
          <img src={logo} alt="" className="" />
        </Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link className="" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <ul>
              <li>
                <Link to="/login" className="">
                  <FaSignInAlt />
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="">
                  <FaUser />
                  Register
                </Link>
              </li>
            </ul>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
