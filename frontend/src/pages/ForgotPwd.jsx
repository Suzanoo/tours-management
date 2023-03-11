import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { forgotPwd } from '../features/auth/authSlice';

const ForgotPasswordPage = () => {
  const [formFields, setFormFields] = useState({ email: '' });
  const { email } = formFields;

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      navigate('/login');
    }
  }, [navigate, isError, isSuccess, message]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email,
    };

    // dispatch the function that sends the reset token to the email address
    dispatch(forgotPwd(userData));
  };

  if (isLoading)
    return (
      <>
        <div className="flex items-center justify-center space-x-2">
          <div
            id="spinner"
            className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current 
              border-r-transparent align-[-0.125em] text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      </>
    );

  return (
    <div className="flex justify-center mx-auto p-6">
      <div className="flex-col w-2/3">
        <div className="flex items-center justify-center space-x-2">
          <div
            id="spinner"
            className=" hidden h-8 w-8 animate-spin rounded-full border-4 border-solid border-current 
              border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>

        <form
          className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter your registered email address:
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
          <button
            type="submit"
            className="baseline text-white bg-brightRed hover:bg-brightRedSupLight 
              font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
