import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import logo from '../public/img/menu-img/logo.png';
import UserMenu from './UserMenu';

function Nav() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // First fetch
  useEffect(() => {}, [dispatch]);

  return (
    <nav className="relative container mx-auto p-6 ">
      <div className="flex justify-between items-center ">
        <div className="pt-2 fill-transparent w-15 h-15">
          <img src={logo} alt="" className="ml-4" />
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
        <UserMenu user={auth.user} className="mr-4" />
      </div>
    </nav>
  );
}

export default Nav;
