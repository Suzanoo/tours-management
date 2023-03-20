/* eslint-disable */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';

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
      navigate('/home'); // Redirect to Home page
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

  if (isLoading)
    return (
      <>
        <div className="flex items-center justify-center space-x-2">
          <div
            id="spinner"
            className=" hidden h-8 w-8 animate-spin rounded-full border-4 border-solid border-current 
              border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      </>
    );

  // 5).
  return (
    <div className="flex justify-center mx-auto p-6">
      <div className="flex-col w-2/3">
        <form
          className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 
            px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder=""
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 
            px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="..."
              onChange={onChange}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="baseline text-white bg-brightRed hover:bg-brightRedSupLight 
              font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <Link to="/forgot-pwd" className="pl-8 text-blue-500">
              Forget Password!
            </Link>
          </div>
          <div className="mt-4">
            Don't have account?{' '}
            <Link to="/register" className="pl-4 text-blue-500 text-sm">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
