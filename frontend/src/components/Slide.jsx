import { useState } from 'react';
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';

import { FaMountain, FaWalking, FaSnowflake, FaTree } from 'react-icons/fa';

import '../public/css/slide.scss';

function Slide() {
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
}

export default Slide;

// import React, { Component } from 'react';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import { FaMountain, FaWalking, FaSnowflake, FaTree } from 'react-icons/fa';
// import '../public/css/slide.scss';

// class Slide extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeOption: 1,
//       title: [],
//       img: [],
//       duration: [],
//     };
//   }

//   componentDidMount() {
//     try {
//       const tours = JSON.parse(localStorage.getItem('tours'));
//       console.log(tours.data);
//       if (tours != null && tours.data.data.length > 4) {
//         tours.data.data.forEach((el) => {
//           this.setState((prevState) => ({
//             title: [...prevState.title, el.name],
//             img: [...prevState.img, el.imageCover],
//             duration: [...prevState.duration, el.duration],
//           }));
//         });
//       }
//     } catch (error) {
//       toast.error('There are no tours yet');
//     }
//   }

//   handleOptionClick = (option) => {
//     this.setState({ activeOption: option });
//   };

//   render() {
//     const { activeOption, title, img, duration } = this.state;
//     return (
//       <>
//         <div className="slide-body">
//           <div className="options">
//             <div
//               className={`option ${activeOption === 1 ? 'active' : ''}`}
//               style={{
//                 '--optionBackground': `url(${require(`../public/img/coverImg/${img[0]}`)})`,
//               }}
//               onClick={() => this.handleOptionClick(1)}
//             >
//               <div className="shadow"></div>
//               <div className="label">
//                 <Link to="">
//                   <div className="icon">
//                     <FaMountain />
//                   </div>
//                 </Link>

//                 <div className="info">
//                   <div className="main">{title[0]}</div>
//                   <div className="sub">{duration[0]} Days Trip</div>
//                 </div>
//               </div>
//             </div>

//             <div
//               className={`option ${activeOption === 2 ? 'active' : ''}`}
//               style={{
//                 '--optionBackground': `url(${require(`../public/img/coverImg/${img[1]}`)})`,
//               }}
//               onClick={() => this.handleOptionClick(2)}
//             >
//               <div className="shadow"></div>
//               <div className="label">
//                 <div className="icon">
//                   <FaSnowflake />
//                 </div>
//                 <div className="info">
//                   <div className="main">{title[1]}</div>
//                   <div className="sub">{duration[1]} Days Trip</div>
//                 </div>
//               </div>
//             </div>

//             <div
//               className={`option ${activeOption === 3 ? 'active' : ''}`}
//               style={{
//                 '--optionBackground': `url(${require(`../public/img/coverImg/${img[2]}`)})`,
//               }}
//               onClick={() => this.handleOptionClick(3)}
//             >
//               <div className="shadow"></div>
//               <div className="label">
//                 <div className="icon">
//                   <FaWalking />
//                 </div>
//                 <div className="info">
//                   <div className="main">{title[2]}</div>
//                   <div className="sub">{duration[2]} Days Trip</div>
//                 </div>
//               </div>
//             </div>

//             <div
//               className={`option ${activeOption === 4 ? 'active' : ''}`}
//               style={{
//                 '--optionBackground': `url(${require(`../public/img/coverImg/${img[3]}`)})`,
//               }}
//               onClick={() => this.handleOptionClick(4)}
//             >
//               <div className="shadow"></div>
//               <div className="label">
//                 <div className="icon">
//                   <FaWalking />
//                 </div>
//                 <div className="info">
//                   <div className="main">{title[3]}</div>
//                   <div className="sub">{duration[3]} Days Trip</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }
// export default Slide;
