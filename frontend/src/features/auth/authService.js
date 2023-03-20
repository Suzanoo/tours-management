import axios from 'axios';

const API_URL = 'api/v1/users';

// Register
const register = async (userData) => {
  const response = await axios.post(API_URL + '/signup', userData);
  if (response.data)
    localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

// Login
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);
  if (response.data)
    localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

// Get User Data
const getUser = async (id) => {
  const response = await axios.get(`http://localhost:3000/api/v1/users/${id}`);
  if (response.data)
    localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

// Logout
const logout = async () => {
  await axios.get(API_URL + '/logout');
  localStorage.removeItem('user');
  // localStorage.removeItem('tours'); // for plublic customers
};

// Forget password
const forgotPwd = async (userData) => {
  const response = await axios.post(API_URL + '/forgot-pwd', userData);
  return response;
};

// Reset password
const resetPwd = async (data) => {
  const response = await axios.patch(
    API_URL + `/reset-pwd/${data.token}`,
    data.userData
  );
  return response;
};

// Update Profile Picture
const updateProfilePicture = async (formData) => {
  const response = await axios
    .patch(API_URL + '/updateUserData', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => {
      // console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  if (response.data)
    localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

// Create services
const authService = {
  register,
  login,
  getUser,
  logout,
  forgotPwd,
  resetPwd,
  updateProfilePicture,
};

export default authService;
