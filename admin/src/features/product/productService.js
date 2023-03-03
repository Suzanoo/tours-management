import axios from 'axios';

const API_URL = 'api/v1/products';

// Get All
const getAllProducts = async () => {
  const response = await axios.get(API_URL + '/');
  // console.log(response.data);
  if (response.data)
    localStorage.setItem('products', JSON.stringify(response.data));
  return response.data;
};

// Create new product
const createNewProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL + '/', productData, {
      withCredentials: true, // To include cookies in Axios requests
    });
    if (response.data) console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// Create services
const productService = {
  getAllProducts,
  createNewProduct,
};

export default productService;
