// import { useState } from 'react';

import { FiCamera } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { updateProfilePicture, getUser } from '../features/auth/authSlice';
import '../public/css/profile_picture.css';

const ProfilePicture = (props) => {
  const dispatch = useDispatch();

  const handleProfilePicUpload = async (event) => {
    const file = event.target.files[0];

    // assign name to file upload,
    const formData = new FormData();
    formData.append('photo', file); // same name in schema, multer will catch this name

    await dispatch(updateProfilePicture(formData));

    // update user data in store
    await dispatch(getUser(props.user._id));
  };

  return (
    <>
      <div className="user-profile">
        <div className="profile-picture">
          <img
            src={`${require(`../public/img/users-profile/${props.user.photo}`)}`}
            alt=""
          />
        </div>
        <label
          htmlFor="profile-pic-upload"
          className="absolute bottom-0 right-0 bg-white rounded-full 
           h-8 w-8 flex justify-center items-center cursor-pointer hover:bg-gray-200"
        >
          <FiCamera className="text-gray-500" />
        </label>
        <input
          type="file"
          id="profile-pic-upload"
          name="photo" //set this name for Multer used
          className="hidden"
          onChange={handleProfilePicUpload}
        />
      </div>
    </>
  );
};

export default ProfilePicture;
