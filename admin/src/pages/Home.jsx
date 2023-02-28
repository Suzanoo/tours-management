import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { FaTimes } from 'react-icons/fa'; // import the 'x' icon from the react-icons library

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

  const onDelete = (ID) => {};

  return (
    <>
      <section>
        <h2>Products List :</h2>
        <ul>
          {products.data.data.map((el, index) => {
            return (
              <li key={index}>
                <Link to="">{el.name}</Link>
                <button onClick={onDelete(el._id)}>
                  <FaTimes />
                </button>
              </li>
            );
          })}
        </ul>

        <Link to="/new-product" className="btn">
          Create New Product
        </Link>
      </section>
    </>
  );
}

export default Home;
