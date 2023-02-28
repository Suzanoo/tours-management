import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { forgotPwd } from '../features/auth/authSlice';

const ForgotPasswordPage = () => {
  const [formFields, setFormFields] = useState({ email: '' });

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

  const hanldeInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // dispatch the function that sends the reset token to the email address
    dispatch(forgotPwd(formFields));
  };

  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group" id="email">
          <label>Enter your registered email address: </label>
          <input
            placeholder="Enter email"
            value={formFields.email}
            name="email"
            type="text"
            onChange={hanldeInputValueChange}
          />
        </div>

        {isLoading ? (
          <p className="message">Please wait ...</p>
        ) : (
          <p className="message">{message.message}</p>
        )}
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-block"
            disabled={isLoading || isSuccess}
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default ForgotPasswordPage;
