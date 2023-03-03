import { useDispatch } from 'react-redux';

import { getAllProducts } from '../features/product/productSlice';

import Slide from '../components/Slide';
import Map from '../components/Map';
import TourForm from '../components/TourForm';

function Home() {
  const dispatch = useDispatch();

  dispatch(getAllProducts());

  return (
    <>
      <section>
        <Slide />
        <Map />
        <TourForm />
      </section>
    </>
  );
}

export default Home;
