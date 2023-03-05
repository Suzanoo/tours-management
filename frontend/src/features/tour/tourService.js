import axios from 'axios';

const API_URL = 'api/v1/tours';

// Get All
const getAll = async () => {
  const response = await axios.get(API_URL + '/');
  if (response.data)
    localStorage.setItem('tours', JSON.stringify(response.data));
  return response.data;
};

// Create services
const tourService = {
  getAll,
};

export default tourService;
