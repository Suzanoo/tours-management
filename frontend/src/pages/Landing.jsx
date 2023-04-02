import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Slide from '../components/Slide';
import Map from '../components/Map';
import Tour from '../components/Tour';

// import { reset } from '../features/tourPlan/tourPlanSlice';
import { getAllTours } from '../features/tour/tourSlice';

function Landing() {
  const tours = useSelector((state) => state.tours.tours);
  const dispatch = useDispatch();

  // First fetch
  useEffect(() => {
    // dispatch(reset());
    dispatch(getAllTours());
  }, [dispatch]);

  return (
    <>
      <div className="container py-4 rounded md:rounded-lg">
        {tours && <Slide />}
        {tours && <Map />}
        <Tour />
      </div>
    </>
  );
}

export default Landing;
