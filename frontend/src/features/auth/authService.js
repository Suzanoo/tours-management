import axios from 'axios';

const API_URL = 'api/v1/users';

// Register endpoint
const register = async (userData) => {
  const response = await axios.post(API_URL + '/signup', userData);
  if (response.data)
    localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

// Login endpoint
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);
  if (response.data)
    localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

// Logout user
const logout = async () => {
  await axios.get(API_URL + '/logout');
  localStorage.removeItem('user');
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

// Create services
const authService = {
  register,
  login,
  logout,
  forgotPwd,
  resetPwd,
};

export default authService;
