import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tourService from './tourService';

/*
1.Fetch tour from localStorage & cast to JSON object
2.Initialize state
3.Create async action-reducer:
4.Create slice
*/

// Fetch user from localStorage & cast to JSON object
const tours = JSON.parse(localStorage.getItem('tours'));

// Initialize state
const initialState = {
  tours: tours ? tours : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create async action-reducer
export const getAllTours = createAsyncThunk(
  // Action type
  'tours/get_all_tours',
  // Payload
  async (thunkAPI) => {
    try {
      return await tourService.getAll();
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
export const tourSlice = createSlice({
  name: 'tours',
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
      .addCase(getAllTours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getAllTours.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tours = null;
      });
  },
});

// Action
export const { reset } = tourSlice.actions;

// Reducer
export default tourSlice.reducer;
