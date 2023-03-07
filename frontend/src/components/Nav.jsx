import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../features/auth/authSlice';
import logo from '../public/img/cat_adobe_express.svg';
import '../public/css/index.css';

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = (menuOption) => {
    if (menuOption === 'personal') {
      navigate('/profile');
    } else if (menuOption === 'setting') {
      navigate('/settings');
    } else if (menuOption === 'logout') {
      handleLogout();
    }
    setShowMenu(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="relative container mx-auto p-6 ">
      <div className="flex justify-between items-center ">
        <div className="pt-2 fill-transparent">
          <img src={logo} alt="" className="w-10 h-10 mx-auto" />
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-darkGrayishBlue">
            Taurus
          </a>
          <a href="/" className="hover:text-darkGrayishBlue">
            Andromeda
          </a>
          <a href="/" className="hover:text-darkGrayishBlue">
            Leo
          </a>
          <a href="/" className="hover:text-darkGrayishBlue">
            Orion
          </a>
        </div>
        {user ? (
          <>
            <div className="relative">
              <button
                id="userBtn"
                className="md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full
                baseline hover:bg-brightRedSupLight"
                onClick={() => setShowMenu(!showMenu)}
              >
                More
              </button>
              {showMenu && (
                <div
                  className="absolute z-40 right-0 top-full mt-1 py-2 bg-white border 
                rounded-lg shadow-lg"
                >
                  <ul>
                    <li>
                      <button
                        className="block px-4 py-2 hover:text-darkGrayishBlue"
                        onClick={() => handleMenuClick('personal')}
                      >
                        Personal
                      </button>
                    </li>
                    <li>
                      <button
                        className="block px-4 py-2 hover:text-darkGrayishBlue"
                        onClick={() => handleMenuClick('setting')}
                      >
                        Settings
                      </button>
                    </li>
                    <li>
                      <button
                        className="block px-4 py-2 hover:text-darkGrayishBlue"
                        onClick={() => handleMenuClick('logout')}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <a
            href="/login"
            className=" md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full \n
           baseline hover:bg-brightRedSupLight "
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}

export default Nav;
