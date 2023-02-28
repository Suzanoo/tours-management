import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

import '../public/css/index.css';

function Footer() {
  return (
    <>
      <footer className="footer">
        <span className="">I tried and failed. I tried again and again.</span>
        <span>
          <Link to="https://github.com/Suzanoo">
            <FaGithub />
          </Link>
        </span>
      </footer>
    </>
  );
}

export default Footer;
