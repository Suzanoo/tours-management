import '../public/css/slide.css';

import { useState } from 'react';

function SlideItem() {
  const [activeOption, setActiveOption] = useState(null);

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const onLoad = () => {
    setActiveOption(1);
  };

  return (
    <>
      <div className="slide-body" onLoad={onLoad}>
        <div className="options">
          <div
            className={`option ${activeOption === 1 ? 'active' : ''}`}
            style={{
              '--optionBackground':
                'url(https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg)',
            }}
            onClick={() => handleOptionClick(1)}
          >
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <i className="fas fa-walking"></i>
              </div>
              <div className="info">
                <div className="main">Blonkisoaz</div>
                <div className="sub">Omuke trughte a otufta</div>
              </div>
            </div>
          </div>

          <div
            className={`option ${activeOption === 2 ? 'active' : ''}`}
            style={{
              '--optionBackground':
                'url(https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg)',
            }}
            onClick={() => handleOptionClick(2)}
          >
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <i className="fas fa-walking"></i>
              </div>
              <div className="info">
                <div className="main">Blonkisoaz</div>
                <div className="sub">Omuke trughte a otufta</div>
              </div>
            </div>
          </div>

          <div
            className={`option ${activeOption === 3 ? 'active' : ''}`}
            style={{
              '--optionBackground':
                'url(https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg)',
            }}
            onClick={() => handleOptionClick(3)}
          >
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <i className="fas fa-walking"></i>
              </div>
              <div className="info">
                <div className="main">Blonkisoaz</div>
                <div className="sub">Omuke trughte a otufta</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SlideItem;
