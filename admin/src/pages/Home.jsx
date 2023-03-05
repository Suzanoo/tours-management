import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import Dropdown from '../components/Dropdown';

import { getAllTours } from '../features/tour/tourSlice';

function Home() {
  // initial
  const [selectedOption, setSelectedOption] = useState('');

  // config
  const dispatch = useDispatch();
  const { tours, isError, isSuccess, message } = useSelector(
    (state) => state.tours
  );

  // dropdown option come from store object
  // TODO check if not Array
  const options = tours.data.data.map((el) => el.name);

  // event handlers
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getAllTours());
  }, [tours, isError, isSuccess, message, dispatch]);

  const handleDropdown = (value) => {
    setSelectedOption(value);
  };

  return (
    <>
      <section>
        {/* Get all */}
        <h2>Tours List :</h2>
        <Dropdown
          options={options}
          onSelect={handleDropdown}
          selectedOption={selectedOption}
          className="form-group"
        />

        <hr></hr>
        <br></br>

        {/* Create new */}
        <button className="btn">
          <Link to="/new-tour" className="btn btn-primary">
            Create New Tour
          </Link>
        </button>
      </section>
    </>
  );
}

export default Home;
