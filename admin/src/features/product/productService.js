import axios from 'axios';

const API_URL = 'api/v1/products';

// Get All
const getAllProducts = async () => {
  const response = await axios.get(API_URL + '/');
  if (response.data)
    localStorage.setItem('products', JSON.stringify(response.data));
  return response.data;
};

// Create new product
const createNewProduct = async (productData) => {
  const response = await axios.post(API_URL + '/', productData);
  if (response.data) console.log(response.data);
  // localStorage.setItem('products', JSON.stringify(response.data));
  // return response.data;
};

// Create services
const productService = {
  getAllProducts,
  createNewProduct,
};

export default productService;
