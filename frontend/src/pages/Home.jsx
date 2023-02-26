import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import { getAllProducts } from '../features/product/productSlice';
import Spinner from '../components/Spinner';

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
    <section>
      <h2>
        <p>I tried and failed.</p>
        <p>I tried again and again.</p>
        <br></br>
        <hr></hr>

        {products.data.data.map((el) => {
          return <li key={el.name}>{el.name}</li>;
        })}
      </h2>
    </section>
  );
}

export default Home;
