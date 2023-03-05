import logo from '../public/img/cat_adobe_express.svg';

function Nav() {
  return (
    <nav className="relative container mx-auto p-6 ">
      <div className="flex justify-between items-center ">
        <div className="pt-2 fill-transparent">
          <img src={logo} alt="" className="w-10 h-10 mx-auto" />
          {/* <a
            href="/"
            className="text-4xl font-bold text-orange-300 hover:text-orange-100"
          >
            |||
          </a> */}
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
        <a
          href="/"
          className=" hidden md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full \n
           baseline hover:bg-brightRedSupLight "
        >
          More
        </a>
      </div>
    </nav>
  );
}

export default Nav;
