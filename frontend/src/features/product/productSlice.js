import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

/*
1.Fetch product from localStorage & cast to JSON object
2.Initialize state
3.Create async action-reducer:
4.Create slice
*/

// Fetch user from localStorage & cast to JSON object
const products = JSON.parse(localStorage.getItem('products'));

// Initialize state
const initialState = {
  products: products ? products : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create async action-reducer: register
export const getAllProducts = createAsyncThunk(
  // async action type
  'products/get_all_products',
  // function return payload
  async (user, thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create slice
export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = true; // ****
      state.isError = false;
      state.message = '';
    },
  },
  // Manage payload life cycle
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Action
export const { reset } = productSlice.actions;

// Reducer
export default productSlice.reducer;
