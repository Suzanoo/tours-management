import axios from 'axios';

const API_URL = 'api/v1/tours';

// Get All
const getAllTours = async () => {
  const response = await axios.get(API_URL + '/');
  // console.log(response.data);
  if (response.data)
    localStorage.setItem('tours', JSON.stringify(response.data));
  return response.data;
};

// Create new tour
const createNewTour = async (tourData) => {
  try {
    const response = await axios.post(API_URL + '/', tourData, {
      withCredentials: true, // To include cookies in Axios requests
    });
    if (response.data) console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// Create services
const tourService = {
  getAllTours,
  createNewTour,
};

export default tourService;
