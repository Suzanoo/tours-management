import axios from 'axios';

const API_URL = 'api/v1/tours';

// Get All
const getAllProducts = async () => {
  const response = await axios.get(API_URL + '/');
  if (response.data)
    localStorage.setItem('products', JSON.stringify(response.data));
  return response.data;
};

// Create services
const productService = {
  getAllProducts,
};

export default productService;
