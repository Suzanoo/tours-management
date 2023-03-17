import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TourTable from '../components/Table';

function Home() {
  const { user } = useSelector((state) => state.auth);
  const { tours } = useSelector((state) => state.tours);

  useEffect(() => {
    // if (tours);
  }, [tours]);

  return (
    <>
      {user ? (
        <div className="container">
          <section>
            {/* Get all */}
            <div className="text-1">Tours Table :</div>
            {tours && <TourTable />}

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
