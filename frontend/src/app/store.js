import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import burgerMenu from '../features/other/burgerMenuSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    burgerMenu: burgerMenu,
  },
});
