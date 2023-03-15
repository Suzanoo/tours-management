import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import Dropdown from '../components/Dropdown';
import TourTable from '../components/Table';

import { getAllTours } from '../features/tour/tourSlice';

function Home() {
  // initial
  const [selectedOption, setSelectedOption] = useState('');

  // config
  const dispatch = useDispatch();
  const { tours } = useSelector((state) => state.tours);

  // First fetch
  useEffect(() => {
    dispatch(getAllTours());
  }, [dispatch]);

  // dropdown option come from store object
  // TODO check if not Array
  const options = tours.data.data.map((el) => el.name);

  // Event handlers
  const handleDropdown = (value) => {
    setSelectedOption(value);
  };

  const updateTable = () => {
    dispatch(getAllTours());
  };

  return (
    <div className="container">
      <section>
        {/* Get all */}
        <div className="text-1">Tours Table :</div>

        {tours && <TourTable data={tours.data.data} />}
        <div className="form-group">
          <button type="submit" className="btn btn-block" onClick={updateTable}>
            Update Table
          </button>
        </div>

        {/* Update One */}
        <div className="text-1">Update A Tour :</div>

        <Dropdown
          options={options}
          onSelect={handleDropdown}
          selectedOption={selectedOption}
          className="form-group"
        />

        {/* Create New One*/}
        <div className="text-1">
          Create New Tour :{' '}
          <Link to="/new-tour" style={{ color: 'orange' }}>
            Create New Tour
          </Link>{' '}
        </div>
      </section>
    </div>
  );
}

export default Home;
