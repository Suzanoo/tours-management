import axios from 'axios';

const API_URL = 'api/v1/tours';

// Get All
const getAll = async () => {
  // localStorage.removeItem('tours');

  const response = await axios.get(API_URL + '/');
  // console.log(response.data);
  if (response.data)
    localStorage.setItem('tours', JSON.stringify(response.data));
  return response.data; // set in localStorage as 'tours' object
};

// Create services
const tourService = {
  getAll,
};

export default tourService;
