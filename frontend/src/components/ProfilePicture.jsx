// import { useState } from 'react';
// import { updateProfilePicture} from '../features/auth/authSlice';

const ProfilePicture = (props) => {
  // const [picture, setPicture] = useState(null);

  return (
    <div className="mt-2">
      <img
        src={`${require(`../public/img/users-profile/${props.user.data.user.photo}`)}`}
        alt=""
        className="mt-0"
      />
      {/* 
      Feature to upload image :
      TODO learn store image in cloud storage

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
