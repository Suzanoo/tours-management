import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tourPlanService from './tourPlanService';

// Fetch plan from localStorage & cast to JSON object
const plan = JSON.parse(localStorage.getItem('plan'));

// Initialize state
const initialState = {
  plan: plan ? plan : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create async action-reducer
export const generatePlan = createAsyncThunk(
  // Action type
  'plan/gen-plan',
  // Payload
  async (tourData, thunkAPI) => {
    try {
      return await tourPlanService.generatePlan(tourData);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create async action-reducer: logout
export const clearPlan = createAsyncThunk(
  // async action type
  'auth/clear-plan',
  (thunkAPI) => {
    try {
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice
export const tourPlanSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false; // ****
      state.isError = false;
      state.message = '';
    },
  },
  // Manage payload life cycle
  extraReducers: (builder) => {
    builder
      .addCase(generatePlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generatePlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.plan = action.payload;
      })
      .addCase(generatePlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.plan = null;
      })
      .addCase(clearPlan.fulfilled, (state) => {
        state.plan = null;
      });
  },
});

// Action
export const { reset } = tourPlanSlice.actions;

// Reducer
export default tourPlanSlice.reducer;
