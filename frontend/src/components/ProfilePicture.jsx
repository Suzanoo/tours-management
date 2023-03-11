import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { updateProfilePicture, reset } from '../features/auth/authSlice';
import Spinner from './Spinner';

const ProfilePicture = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //   const initial = {
  //     picture: `${require(`../public/img/menu-img/profile.png`)}`,
  //   };

  const [picture, setPicture] = useState(null);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      // navigate('/'); // Redirect to Home page
    }

    // dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  const handlePictureSubmit = async () => {
    const formData = new FormData();
    // console.log('Profile pict', picture);
    formData.append('picture', picture.name);

    dispatch(updateProfilePicture(formData));
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="mt-2">
      <img
        src={`${require(`../public/img/users-profile/${user.data.user.photo}`)}`}
        alt=""
        className="mt-0"
      />
      {/* 
      TODO see method in ChatGPT
      <label htmlFor="picture-input">
        <i className="fas fa-camera"></i>
      </label>
      <input
        id="picture-input"
        type="file"
        accept="image/*"
        onChange={handlePictureChange}
      />
      <button onClick={handlePictureSubmit}>Upload</button> */}
    </div>
  );
};

export default ProfilePicture;
