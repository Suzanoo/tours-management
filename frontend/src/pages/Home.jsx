import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import Spinner from '../components/Spinner';
import Slide from '../components/Slide';

function Home() {
  const dispatch = useDispatch();

  const { products, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // dispatch(getAllProducts());
  }, [isError, isSuccess, message, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <section>
        <Slide />
      </section>
    </>
  );
}

export default Home;
