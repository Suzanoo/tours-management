import { useState } from 'react';
import { toast } from 'react-toastify';

import generatePlan from '../features/tourPlan/tourPlanService';

import '../public/css/index.css';

function Tour() {
  const initialState = {
    start: '',
    destination: '',
    duration: '',
    options: '',
  };

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
    };

    try {
      document.getElementById('spinner').style.display = 'block';
      const plan = await generatePlan(tourData);
      document.getElementById('spinner').style.display = 'none';
      document.getElementById('tour-plan').innerHTML = plan;
    } catch (error) {
      document.getElementById('spinner').style.display = 'none';
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center mx-auto p-6">
        <div className="flex-col w-2/3">
          <div className="flex items-center justify-center space-x-2">
            <div
              id="spinner"
              className=" hidden h-8 w-8 animate-spin rounded-full border-4 border-solid border-current \
              border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          </div>

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
                className="shadow appearance-none border rounded w-full py-2 \
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
                className="shadow appearance-none border rounded w-full py-2 \
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
                className="shadow appearance-none border rounded w-full py-2 px-3 \
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
                className="shadow appearance-none border rounded w-full py-2 px-3 \
             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="options"
                name="options"
                value={options}
                placeholder=""
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              className="baseline text-white bg-brightRed hover:bg-brightRedSupLight \
              font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Plan
            </button>
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
