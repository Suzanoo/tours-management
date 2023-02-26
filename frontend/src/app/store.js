import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice';
// import burgerMenu from '../features/other/burgerMenuSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    // burgerMenu: burgerMenu,
  },
});
