import { Link } from 'react-router-dom';

import logo from '../public/img/menu-img/logo.png';
import UserMenu from './UserMenu';

function Nav() {
  return (
    <nav className="relative container mx-auto p-6 ">
      <div className="flex justify-between items-center ">
        <div className="pt-2 fill-transparent w-15 h-15">
          <Link to="/home">
            <img src={logo} alt="" className="ml-4" />
          </Link>
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
        <UserMenu className="mr-4" />
      </div>
    </nav>
  );
}

export default Nav;
