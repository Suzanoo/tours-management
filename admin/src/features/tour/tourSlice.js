import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tourService from './tourService';

// Fetch tours from localStorage & cast to JSON object
const tours = JSON.parse(localStorage.getItem('tours'));

// Initialize state
const initialState = {
  tours: tours ? tours : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create async action:reducer
export const getAllTours = createAsyncThunk(
  // Action type
  'tours/get_all_tours',
  // Payload:
  async (thunkAPI) => {
    try {
      return await tourService.getAllTours();
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNewTour = createAsyncThunk(
  // Action type
  'tours/create-new-tour',
  // Payload:
  async (tourData, thunkAPI) => {
    console.log(tourData);
    try {
      return await tourService.createNewTour(tourData);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTour = createAsyncThunk(
  // Action type
  'tours/update-tour',
  //  * createAsyncThunk expects a single argument creator function
  //  * that takes a single argument as payload
  async ({ id, tourData }, thunkAPI) => {
    try {
      return await tourService.updateTour(id, tourData);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTour = createAsyncThunk(
  // Action type
  'tours/delete-tour',
  //  * createAsyncThunk expects a single argument creator function
  //  * that takes a single argument as payload
  async (id, thunkAPI) => {
    try {
      await tourService.deleteTour(id);
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
  // Payload life cycle
  extraReducers: (builder) => {
    builder
      .addCase(getAllTours.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tours = action.payload;
      })
      .addCase(getAllTours.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createNewTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tours = action.payload;
      })
      .addCase(createNewTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTour.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTour.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Action
export const { reset } = tourSlice.actions;

// Reducer
export default tourSlice.reducer;
