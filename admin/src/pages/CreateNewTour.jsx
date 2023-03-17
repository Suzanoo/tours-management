import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { createNewTour, getAllTours, reset } from '../features/tour/tourSlice';

const options = ['easy', 'medium', 'difficulty'];
function CreateNewTour() {
  // 1).Initial state
  const initial = {
    startLocation: {
      address: '',
    },
    name: '',
    duration: '',
    maxGroupSize: '',
    difficulty: '',
    price: '',
    summary: '',
    description: '',
    imageCover: '',
    startDates: [null, null, null],
  };

  // 2).Configure form fields
  const [formData, setFormData] = useState(initial);
  const {
    startLocation,
    name,
    duration,
    maxGroupSize,
    difficulty,
    price,
    summary,
    description,
    imageCover,
    startDates,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 3).Access store
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tours
  );

  // 4).Events handlers
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess) {
      // navigate('/');
    }
  }, [isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleStartDate = (date, index) => {
    const newStartDates = [...formData.startDates];
    newStartDates[index] = date;
    setFormData({ ...formData, startDates: newStartDates });
  };

  const handleStartLocation = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      startLocation: {
        ...prevState.startLocation,
        [name]: value,
      },
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const tourData = {
      startLocation,
      name,
      duration: +duration, // convert to int
      maxGroupSize: +maxGroupSize, // convert to int
      difficulty,
      price: +price, // convert to int
      summary,
      description,
      imageCover,
      startDates,
    };
    await dispatch(createNewTour(tourData));
    navigate('/home');
    dispatch(getAllTours('http://localhost:3000/api/v1/tours'));
  };

  if (isLoading) return <div class="spinner"></div>;

  //5).JSX Rendering
  return (
    <>
      <section className="heading">
        <p>Create New Tour</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="startLocation.address">
              Start Location Address
            </label>
            <input
              type="text"
              name="address"
              value={startLocation.address}
              onChange={handleStartLocation}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Tour Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Name range 5-50 characters"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Tour Duration</label>
            <input
              className="form-control"
              type="number"
              name="duration"
              value={duration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxGroupSize">Maximum Group Size</label>
            <input
              type="number"
              name="maxGroupSize"
              value={maxGroupSize}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              name="difficulty"
              value={difficulty}
              onChange={handleChange}
            >
              <option value="">--Choose...--</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              className="form-control"
              type="number"
              name="price"
              value={price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="summary">Tour Summary</label>
            <textarea
              name="summary"
              value={summary}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="description">Tour Description</label>
            <textarea
              className="form-control"
              name="description"
              value={description}
              required
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="imageCover">Cover Image</label>
            <input
              type="text"
              name="imageCover"
              value={imageCover}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDates">Start Dates</label>
            {startDates.map((el, index) => (
              <DatePicker
                key={index}
                selected={el}
                onChange={(date) => handleStartDate(date, index)}
                dateFormat="yyyy/MM/dd"
              />
            ))}
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateNewTour;
