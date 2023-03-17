import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import TourTable from '../components/Table';

function Home() {
  const { user } = useSelector((state) => state.auth);
  const { tours } = useSelector((state) => state.tours);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // if (tours);
  }, [tours]);

  const dropdownOptions = tours?.data?.data?.map((el) => el.name) || [];

  // Event handlers
  const handleDropdown = (value) => {
    setSelectedOption(value);
  };

  return (
    <>
      {user ? (
        <div className="container">
          <section>
            {/* Get all */}
            <div className="text-1">Tours Table :</div>
            {tours && <TourTable />}

            {/* Update One */}
            <div className="text-1">Update A Tour :</div>
            <Dropdown
              options={dropdownOptions}
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
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Home;
