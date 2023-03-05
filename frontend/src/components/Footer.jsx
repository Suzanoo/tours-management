import { FaGithub } from 'react-icons/fa';

import '../public/css/main.css';

function Footer() {
  return (
    <>
      <footer className="flex justify-center items-center bottom-0 w-full  py-4">
        <span className="mr-4">
          I tried and failed. I tried again and again.
        </span>
        <a href="https://github.com/Suzanoo" className="mr-4">
          <FaGithub />
        </a>
      </footer>
    </>
  );
}

export default Footer;
