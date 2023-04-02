import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

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
        <Link to="/home">
          <img
            src={`${require('../public/img/logo.png')}`}
            alt=""
            className=""
          />
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
                <Link to="/" className="">
                  <FaSignInAlt />
                  Login
                </Link>
              </li>
              {/* Not allow register: New admin must be created by existing admin*/}
              {/* <li>
                <Link to="/register" className="">
                  <FaUser />
                  Register
                </Link>
              </li> */}
            </ul>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
