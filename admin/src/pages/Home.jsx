import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import Dropdown from '../components/Dropdown';

import { getAllProducts } from '../features/product/productSlice';

function Home() {
  // initial
  const [selectedOption, setSelectedOption] = useState('');

  // config
  const dispatch = useDispatch();
  const { products, isError, isSuccess, message } = useSelector(
    (state) => state.products
  );

  // dropdown option come from store object
  // TODO check if not Array
  const options = products.data.data.map((el) => el.name);

  // event handlers
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // if (!products) dispatch(getAllProducts());
    dispatch(getAllProducts());
  }, [products, isError, isSuccess, message, dispatch]);

  const handleDropdown = (value) => {
    setSelectedOption(value);
  };

  return (
    <>
      <section>
        {/* Get all */}
        <h2>Products List :</h2>
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
          <Link to="/new-product" className="btn btn-primary">
            Create New Product
          </Link>
        </button>
      </section>
    </>
  );
}

export default Home;
