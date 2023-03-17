import axios from 'axios';

const API_URL = 'api/v1/tours';

// Get All
const getAllTours = async (url) => {
  if (!url) url = `${API_URL}/`;

  try {
    const response = await axios.get(url);
    if (response.data) {
      localStorage.setItem('tours', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
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

// Update tour
const updateTour = async (id, tourData) => {
  try {
    const response = await axios.patch(
      // use absolute path instead of relative path
      `http://localhost:3000/api/v1/tours/${id}`,
      tourData,
      {
        withCredentials: true, // To include cookies in Axios requests to get auth token
      }
    );
    if (response.data) return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Delete tour
const deleteTour = async (id) => {
  try {
    await axios.delete(
      // use absolute path instead of relative path
      `http://localhost:3000/api/v1/tours/${id}`,
      {
        withCredentials: true, // To include cookies in Axios requests to get auth token
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// Create services
const tourService = {
  getAllTours,
  createNewTour,
  updateTour,
  deleteTour,
};

export default tourService;
