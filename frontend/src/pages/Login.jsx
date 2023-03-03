/* eslint-disable */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import FormGroup from 'react-bootstrap/esm/FormGroup';

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
  const [formValue, setformValue] = useState(initialState);
  const { email, password } = formValue;
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

  const onChange = (e) => {
    setformValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
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

  if (isLoading) return <Spinner animation="border" />;

  // 5).
  return (
    <>
      <section className="form-group">
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
            <button type="submit" className="btn-submit .btn:hover">
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
