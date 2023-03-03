import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  createNewProduct,
  getAllProducts,
  reset,
} from '../features/product/productSlice';

import Spinner from '../components/Spinner';

/*
1).Define initial blank form
2).Configure form fields and hooks required
3).Access auth state in store and parse into variables
4).Events handlers
5).JSX Rendering
*/
const options = ['easy', 'medium', 'difficulty'];
function CreateNewProduct() {
  // 1).Initial state
  const initialState = {
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
  const [formData, setFormData] = useState(initialState);
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

  // 3).Access auth state in store and parse to variables
  const { products, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.products
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
  }, [products, isError, isSuccess, message, navigate, dispatch]);

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

  const onSubmit = (e) => {
    e.preventDefault();

    const productData = {
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
    dispatch(createNewProduct(productData));
  };

  if (isLoading) return <Spinner />;

  //5).JSX Rendering
  return (
    <>
      <section className="heading">
        <p>Create New Product</p>
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
              required
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

export default CreateNewProduct;
