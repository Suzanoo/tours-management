import { useState } from 'react';
import { toast } from 'react-toastify';

import Spinner from 'react-bootstrap/Spinner';

import generatePlan from '../features/tourPlan/tourPlanService';

function TourForm() {
  const initialState = {
    start: '',
    destination: '',
    duration: '',
    options: '',
  };

  // const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState(initialState);
  const { start, destination, duration, options } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const tourData = {
      start,
      destination,
      duration,
      options,
      // language,
    };

    try {
      // Show spinner while generating plan
      document.getElementById('spinner').style.display = 'block';
      const plan = await generatePlan(tourData);

      // Hide spinner after generating plan
      document.getElementById('spinner').style.display = 'none';

      // Render the HTML result in the "tour-plan" div
      document.getElementById('tour-plan').innerHTML = plan;
    } catch (error) {
      // Hide spinner on error
      document.getElementById('spinner').style.display = 'none';
      toast.error(error.message);
    }
  };

  return (
    <>
      <section className="">
        <h4>Where are you going. I will give you PLAN~^^</h4>

        <div id="spinner" style={{ display: 'none' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Start From:</label>
            <input
              type="text"
              className="form-control"
              id="start"
              name="start"
              value={start}
              placeholder=""
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Destination:</label>
            <input
              type="text"
              className="form-control"
              id="destination"
              name="destination"
              value={destination}
              placeholder=""
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Duration:</label>
            <input
              type="text"
              className="form-control"
              id="duration"
              name="duration"
              value={duration}
              placeholder=""
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Other Prompt:</label>
            <input
              type="text"
              className="form-control"
              id="options"
              name="options"
              value={options}
              placeholder=""
              onChange={onChange}
            />
          </div>

          <div className="">
            <button type="submit" className="btn-submit">
              Generate
            </button>
            {/* <label>
              <input
                type="radio"
                name="language"
                value="en"
                checked={language === 'en'}
                onChange={() => setLanguage('en')}
              />
              English
            </label>
            <label>
              <input
                type="radio"
                name="language"
                value="th"
                checked={language === 'th'}
                onChange={() => setLanguage('th')}
              />
              Thai
            </label>*/}
          </div>

          <div id="tour-plan"></div>
        </form>
      </section>
    </>
  );
}

export default TourForm;
