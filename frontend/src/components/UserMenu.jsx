import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

import { logout } from '../features/auth/authSlice';
import UserProfilePicture from './ProfilePicture';

import '../public/css/profile_picture.css';

function UserMenu() {
  const auth = useSelector((state) => state.auth);
  const user = auth.user != null ? auth.user.data.user : null;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuRef]);

  const handleMenuHover = () => {
    setShowMenu(true);
  };

  const handleMenuClick = (menuOption) => {
    if (menuOption === 'personal') {
      navigate('/');
    } else if (menuOption === 'setting') {
      navigate('/');
    } else if (menuOption === 'logout') {
      handleLogout();
    }
    setShowMenu(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  return (
    <div className="flex justify-between items-center ">
      {user != null ? (
        <>
          <div className="relative">
            <div
              id="user-img"
              className="cursor-pointer profile-picture"
              onMouseEnter={handleMenuHover}
            >
              <img
                src={`${require(`../public/img/users-profile/${user.photo}`)}`}
                alt=""
              />
            </div>
            {showMenu && (
              <div
                id="user-menu"
                ref={menuRef}
                className="flex flex-col items-center absolute z-40 right-0 top-full bg-white border 
                rounded-lg shadow-lg "
              >
                <div className="justify-center mx-8">
                  <ul className="flex flex-col items-center">
                    {/* Profile picture */}
                    <li className="px-4 py-2">
                      <div style={{ position: 'relative' }}>
                        <UserProfilePicture user={user} />
                      </div>
                    </li>
                    {/* Name */}
                    <li>
                      <span className=" text-orange-500 font-bold">
                        {user.name}
                      </span>
                    </li>
                    {/* Personal Data */}
                    <li>
                      <div
                        className="flex cursor-pointer items-center px-4 py-2 hover:text-darkGrayishBlue"
                        onClick={() => handleMenuClick('personal')}
                      >
                        <FiUser className="inline-block mr-2 text-orange-500" />
                        <span className="inline-block align-middle">
                          Personal
                        </span>
                      </div>
                    </li>
                    {/* Setting */}
                    <li>
                      <div
                        className="flex cursor-pointer items-center px-4 py-2 hover:text-darkGrayishBlue"
                        onClick={() => handleMenuClick('setting')}
                      >
                        <FiSettings className="inline-block mr-2 text-orange-500" />
                        <span className="inline-block align-middle">
                          Settings
                        </span>
                      </div>
                    </li>
                    {/* Logout */}
                    <li>
                      <div
                        className="flex cursor-pointer items-center px-4 py-2 hover:text-darkGrayishBlue"
                        onClick={() => handleMenuClick('logout')}
                      >
                        <FiLogOut className="inline-block mr-2 text-orange-500" />
                        <span className="inline-block align-middle">
                          Logout
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
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
  );
}

export default UserMenu;
