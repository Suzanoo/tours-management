/* eslint-disable */

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

/*
1).Define initial blank form
2).Configure form fields and hooks required
3).Access auth state in store and parse into variables
4).Events handlers
5).JSX Rendering
*/

function Login() {
  // 1)
  const initialState = {
    email: '',
    password: '',
  };

  // 2).
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 3).
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // 4).
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate('/'); // Redirect to Home page
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (el) => {
    setFormData((prevState) => ({
      ...prevState,
      [el.target.name]: el.target.value,
    }));
  };

  const onSubmit = (el) => {
    el.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData)); // update state
  };

  if (isLoading) return <Spinner />;

  // 5).
  return (
    <>
      <section className="heading">
        <p>Login and Enjoy!</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Email Address"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
          <Link to="/forgot-pwd">Forget Password!</Link>
        </form>
      </section>
    </>
  );
}

export default Login;
