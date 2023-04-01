import { useState } from 'react';

import { Link } from 'react-router-dom';

import { FaMountain } from 'react-icons/fa';
import StarRating2 from './StarRating2';

import '../public/css/slide.scss';

function Slide() {
  const [activeOption, setActiveOption] = useState(1);
  const tours = JSON.parse(localStorage.getItem('tours')) || [];

  let slideOptions = [];

  if (tours) {
    slideOptions = tours.data.data.map((tour, index) => (
      <div
        key={index}
        className={`option ${activeOption === index + 1 ? 'active' : ''}`}
        style={{
          '--optionBackground': `url(${require(`../public/img/coverImg/${tour.imageCover}`)})`,
        }}
        onClick={() => handleOptionClick(index + 1)}
      >
        <div className="shadow"></div>
        <div className="label">
          <Link to="">
            <div className="icon">
              <FaMountain />
            </div>
          </Link>

          <div className="info">
            <div className="main">{tour.name}</div>
            <div className="sub">{tour.duration} Days Trip</div>
            <StarRating2 rating={tour.ratingsAverage} />
          </div>
        </div>
      </div>
    ));
  }

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  return (
    <>
      <div className="slide-body">
        <div className="options">{slideOptions}</div>
      </div>
    </>
  );

  /** OLD CODE
  const [activeOption, setActiveOption] = useState(1);

  const tours = JSON.parse(localStorage.getItem('tours'));
  // console.log(tours);

  const title = [];
  const img = [];
  const duration = [];

  // console.log(img.length);

  if (tours != null) {
    tours.data.data.forEach((el) => {
      title.push(el.name);
      img.push(el.imageCover);
      duration.push(el.duration);
    });
  }

  // console.log(img.length);

  try {
    if (tours != null) {
    }
  } catch (error) {
    toast.error('There are no tours yet');
  }

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  return (
    <>
      <div className="slide-body">
        <div className="options">
          <div
            className={`option ${activeOption === 1 ? 'active' : ''}`}
            style={{
              '--optionBackground': `url(${require(`../public/img/coverImg/${img[0]}`)})`,
            }}
            onClick={() => handleOptionClick(1)}
          >
            <div className="shadow"></div>
            <div className="label">
              <Link to="">
                <div className="icon">
                  <FaMountain />
                </div>
              </Link>

              <div className="info">
                <div className="main">{title[0]}</div>
                <div className="sub">{duration[0]} Days Trip</div>
              </div>
            </div>
          </div>

          <div
            className={`option ${activeOption === 2 ? 'active' : ''}`}
            style={{
              '--optionBackground': `url(${require(`../public/img/coverImg/${img[1]}`)})`,
            }}
            onClick={() => handleOptionClick(2)}
          >
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <FaSnowflake />
              </div>
              <div className="info">
                <div className="main">{title[1]}</div>
                <div className="sub">{duration[1]} Days Trip</div>
              </div>
            </div>
          </div>

          <div
            className={`option ${activeOption === 3 ? 'active' : ''}`}
            style={{
              '--optionBackground': `url(${require(`../public/img/coverImg/${img[2]}`)})`,
            }}
            onClick={() => handleOptionClick(3)}
          >
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <FaWalking />
              </div>
              <div className="info">
                <div className="main">{title[2]}</div>
                <div className="sub">{duration[2]} Days Trip</div>
              </div>
            </div>
          </div>

          <div
            className={`option ${activeOption === 4 ? 'active' : ''}`}
            style={{
              '--optionBackground': `url(${require(`../public/img/coverImg/${img[3]}`)})`,
            }}
            onClick={() => handleOptionClick(4)}
          >
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <FaTree />
              </div>
              <div className="info">
                <div className="main">{title[3]}</div>
                <div className="sub">{duration[3]} Days Trip</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  */
}

export default Slide;
