import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

/*
1).Define initial blank form
2).Configure form fields and hooks required
3).Access auth state in store and parse into variables
4).Events handlers
5).JSX Rendering
*/

function Register() {
  // 1).Define initial blank form
  const initialState = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  // 2).Configure form fields
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, passwordConfirm } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 3).Access auth state in store and parse to variables
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // 4).Events handlers
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

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
        // passwordConfirm,
      };
      // update state
      dispatch(register(userData));
    }
  };

  if (isLoading) return <Spinner />;

  //5).JSX Rendering
  return (
    <>
      <section className="heading">
        <p>Hello Welcome ~^^</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Name"
              onChange={onChange}
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              id="passwordConfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              placeholder="Password Confirm"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
