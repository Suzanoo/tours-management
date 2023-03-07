import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  generatePlan,
  clearPlan,
  reset,
} from '../features/tourPlan/tourPlanSlice';
import { formatTextToHTML } from '../utils/formatDescription';
import '../public/css/index.css';

function Tour() {
  const initialState = {
    start: '',
    destination: '',
    duration: '',
    options: '',
  };

  const { plan, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.plan
  );

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const { start, destination, duration, options } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      document.getElementById('tour-plan').innerHTML = formatTextToHTML(
        plan.data.choices
      ).html;

      // console.log(plan.data.choices);
      // console.log(formatTextToHTML(plan.data.choices));
    }

    dispatch(reset());
  }, [plan, isError, isSuccess, message, dispatch, navigation]);

  if (isLoading)
    return (
      <>
        <div className="flex items-center justify-center space-x-2">
          <div
            id="spinner"
            className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current 
              border-r-transparent align-[-0.125em] text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      </>
    );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const tourData = {
      start,
      destination,
      duration,
      options,
    };

    try {
      dispatch(generatePlan(tourData));
    } catch (error) {
      toast.error(error.message);
      console.error(error.stack);
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    // dispatch(clearPlan()); // If you want to reset "plan" value instore back to null
  };

  return (
    <>
      <div className="flex justify-center mx-auto p-6">
        <div className="flex-col w-2/3">
          <form
            className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <p className="block text-gray-700 text-sm font-bold mb-2">
                Where're you going?.
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Start:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 
            px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="start"
                name="start"
                value={start}
                placeholder="Bangkok"
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Destination:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 
            px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="destination"
                name="destination"
                value={destination}
                placeholder="Chiangmai"
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Duration: Days
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                id="duration"
                name="duration"
                value={duration}
                placeholder="  7"
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Other Request
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="options"
                name="options"
                value={options}
                placeholder=""
                onChange={onChange}
              />
            </div>

            <div className="flex">
              <button
                type="submit"
                className="baseline text-white bg-darkBlue hover:bg-brightRedSupLight 
              font-bold py-2 px-4 mr-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Plan
              </button>

              <button
                type="submit"
                className="baseline text-white bg-brightRed hover:bg-brightRedSupLight 
              font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline"
                onClick={resetForm}
              >
                Clear
              </button>
            </div>
          </form>

          <div
            id="tour-plan"
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            ...
          </div>
        </div>
      </div>
    </>
  );
}

export default Tour;
