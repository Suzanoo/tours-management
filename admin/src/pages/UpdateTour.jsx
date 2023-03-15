import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

import { getAllTours, updateTour, reset } from '../features/tour/tourSlice';

const options = ['easy', 'medium', 'difficulty'];

function UpdateTour() {
  // Initial configuration:
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tours, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tours
  );

  const initialState = {
    name: '',
    duration: '',
    maxGroupSize: '',
    difficulty: '',
    price: '',
    summary: '',
    description: '',
    imageCover: '',
  };

  const [formData, setFormData] = useState(initialState);

  // Fetch data depend on user click from table first:
  useEffect(() => {
    const tourData = tours.data.data.find((t) => t._id === id);
    if (tourData) {
      setFormData(tourData);
    }
  }, [tours, id]);

  const {
    name,
    duration,
    maxGroupSize,
    difficulty,
    price,
    summary,
    description,
    imageCover,
  } = formData;

  // Events handlers:
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess) {
      // dispatch(getAllTours()); // fetch updated tours list from server
      // navigate('/'); // redirect to home page
    }
  }, [isSuccess, isError, message, dispatch, navigate]);

  const handleChange = (el) => {
    setFormData((prevState) => ({
      ...prevState,
      [el.target.name]: el.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const tourData = {
      duration: +duration, // convert to int
      maxGroupSize: +maxGroupSize, // convert to int
      difficulty,
      price: +price, // convert to int
      summary,
      description,
      imageCover,
    };
    dispatch(updateTour({ id, tourData }));
  };

  if (isLoading) return <Spinner />;

  // Rendering
  return (
    <>
      <section className="heading">
        <p>Update Tour</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="duration">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxGroupSize">Maximum Group Size</label>
            <input
              type="number"
              name="maxGroupSize"
              value={maxGroupSize}
              onChange={handleChange}
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
            />
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

export default UpdateTour;
