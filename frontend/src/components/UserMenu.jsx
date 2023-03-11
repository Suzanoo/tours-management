import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../features/auth/authSlice';
import UserProfilePicture from './ProfilePicture';

function UserMenu(props) {
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
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center ">
      {props.user ? (
        <>
          <div className="relative">
            <div
              id="user-menu"
              className="cursor-pointer"
              onMouseEnter={handleMenuHover}
            >
              <img
                src={`${require(`../public/img/menu-img/profile.png`)}`}
                alt=""
                className=""
              />
            </div>
            {showMenu && (
              <div
                ref={menuRef}
                className="absolute z-40 right-0 top-full bg-white border 
                rounded-lg shadow-lg"
              >
                <div className="justify-center mx-8">
                  <UserProfilePicture />
                  <p className="ml-2 text-orange-500 font-bold">Sparrow</p>
                  <span></span>
                  <ul>
                    <li>
                      <div
                        className="block px-4 py-2 hover:text-darkGrayishBlue"
                        onClick={() => handleMenuClick('personal')}
                      >
                        <img
                          src={`${require('../public/img/menu-img/profile.png')}`}
                          alt=""
                          className="mt-0"
                        />
                        Personal
                      </div>
                    </li>
                    <li>
                      <div
                        className="block px-4 py-2 hover:text-darkGrayishBlue"
                        onClick={() => handleMenuClick('setting')}
                      >
                        <img
                          src={`${require('../public/img/menu-img/setting.png')}`}
                          alt=""
                          className="mt-0"
                        />
                        Settings
                      </div>
                    </li>
                    <li>
                      <div
                        className="block px-4 py-2 hover:text-darkGrayishBlue"
                        onClick={() => handleMenuClick('logout')}
                      >
                        <img
                          src={`${require('../public/img/menu-img/logout.png')}`}
                          alt=""
                          className="mt-0"
                        />
                        Logout
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

  // return (
  //   <div className="flex justify-between items-center ">
  //     {props.user ? (
  //       <>
  //         <div className="relative">
  //           <div
  //             id="user-menu"
  //             className="cursor-pointer"
  //             onMouseEnter={handleMenuHover}
  //           >
  //             <img
  //               src={`${require(`../public/img/menu-img/profile.png`)}`}
  //               alt=""
  //               className=""
  //             />
  //           </div>
  //           {showMenu && (
  //             <div
  //               ref={menuRef}
  //               className="absolute z-40 right-0 top-full bg-white border
  //               rounded-lg shadow-lg"
  //             >
  //               <div className="justify-center mx-8">
  //                 {props.user.photo === undefined ? (
  //                   <img
  //                     src={`${require('../public/img/users-profile/default-img.png')}`}
  //                     alt=""
  //                     className="mt-2"
  //                   />
  //                 ) : (
  //                   <img
  //                     src={`${require(`../public/img/users-profile/${props.user.photo}`)}`}
  //                     alt=""
  //                     className="mt-0"
  //                   />
  //                 )}
  //                 <p className="ml-2 text-orange-500 font-bold">Sparrow</p>
  //                 <span></span>
  //                 <ul>
  //                   <li>
  //                     <div
  //                       className="block px-4 py-2 hover:text-darkGrayishBlue"
  //                       onClick={() => handleMenuClick('personal')}
  //                     >
  //                       <img
  //                         src={`${require('../public/img/menu-img/profile.png')}`}
  //                         alt=""
  //                         className="mt-0"
  //                       />
  //                       Personal
  //                     </div>
  //                   </li>
  //                   <li>
  //                     <div
  //                       className="block px-4 py-2 hover:text-darkGrayishBlue"
  //                       onClick={() => handleMenuClick('setting')}
  //                     >
  //                       <img
  //                         src={`${require('../public/img/menu-img/setting.png')}`}
  //                         alt=""
  //                         className="mt-0"
  //                       />
  //                       Settings
  //                     </div>
  //                   </li>
  //                   <li>
  //                     <div
  //                       className="block px-4 py-2 hover:text-darkGrayishBlue"
  //                       onClick={() => handleMenuClick('logout')}
  //                     >
  //                       <img
  //                         src={`${require('../public/img/menu-img/logout.png')}`}
  //                         alt=""
  //                         className="mt-0"
  //                       />
  //                       Logout
  //                     </div>
  //                   </li>
  //                 </ul>
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       </>
  //     ) : (
  //       <a
  //         href="/login"
  //         className=" md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full \n
  //          baseline hover:bg-brightRedSupLight "
  //       >
  //         Login
  //       </a>
  //     )}
  //   </div>
  // );
}

export default UserMenu;
