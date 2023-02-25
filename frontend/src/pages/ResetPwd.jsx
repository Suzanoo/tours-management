import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { resetPwd, reset } from '../features/auth/authSlice';

const defaultFormFields = {
  password: '',
  passwordConfirm: '',
};

const ResetPasswordPage = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { user, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      token: token,
      userData: formFields,
    };

    dispatch(resetPwd(data));
  };

  const handleInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  useEffect(() => {
    if (isSuccess && user) {
      toast.success(message);
      navigate('/login');
    }
    if (isError) {
      toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, user, isError, dispatch, message, navigate]);

  return (
    <section className="form">
      <h1 className="form-heading">Reset your password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group" id="password">
          <label>New Password</label>
          <input
            placeholder="Enter your new password"
            value={formFields.password}
            name="password"
            type="password"
            onChange={handleInputValueChange}
          />
          {/* <span className="error-text">{formErrors.password}</span> */}
        </div>
        <div className="form-group" id="passwordConfirm">
          <label>Confirm Password</label>
          <input
            placeholder="Confirm your password"
            value={formFields.passwordConfirm}
            name="passwordConfirm"
            type="password"
            onChange={handleInputValueChange}
          />
          {/* <span className="error-text">{formErrors.passwordConfirm}</span> */}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default ResetPasswordPage;
