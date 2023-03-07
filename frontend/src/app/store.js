import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tourReducer from '../features/tour/tourSlice';
import tourPlanReducer from '../features/tourPlan/tourPlanSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tours: tourReducer,
    plan: tourPlanReducer,
  },
});
