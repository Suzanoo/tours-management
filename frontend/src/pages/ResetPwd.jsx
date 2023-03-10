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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

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

  const onSubmit = (event) => {
    event.preventDefault();
    const data = {
      token: params.token,
      userData: formFields,
    };

    dispatch(resetPwd(data));
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="flex justify-center mx-auto p-6">
      <div className="flex-col w-2/3">
        <form
          className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmit}
        >
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
              value={formFields.password}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm your new password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 
            px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formFields.passwordConfirm}
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
              Create New Password
            </button>
          </div>
        </form>
      </div>
    </div>

    // <section className="form">
    //   <h1 className="form-heading">Reset your password</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div className="form-group" id="password">
    //       <label>New Password</label>
    //       <input
    //         placeholder="Enter your new password"
    //         value={formFields.password}
    //         name="password"
    //         type="password"
    //         onChange={handleInputValueChange}
    //       />
    //       {/* <span className="error-text">{formErrors.password}</span> */}
    //     </div>
    //     <div className="form-group" id="passwordConfirm">
    //       <label>Confirm Password</label>
    //       <input
    //         placeholder="Confirm your password"
    //         value={formFields.passwordConfirm}
    //         name="passwordConfirm"
    //         type="password"
    //         onChange={handleInputValueChange}
    //       />
    //       {/* <span className="error-text">{formErrors.passwordConfirm}</span> */}
    //     </div>
    //     <div className="form-group">
    //       <button type="submit" className="btn btn-block">
    //         Submit
    //       </button>
    //     </div>
    //   </form>
    // </section>
  );
};

export default ResetPasswordPage;
