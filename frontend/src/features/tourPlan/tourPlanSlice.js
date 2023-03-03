// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import tourPlanService from './tourPlanService';

// /*
// 1.Fetch user from localStorage & cast to JSON object
// 2.Initialize state
// 3.Create async action-reducer:
//   -register
//   -login
//   -logout
// 4.Create slice
// */

// // Fetch user from localStorage & cast to JSON object
// // const user = JSON.parse(localStorage.getItem('user'))

// // Initialize state
// const initialState = {
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: '',
// };

// // Create async action-reducer: register
// export const generateTourPlan = createAsyncThunk(
//   // async action type
//   'auth/tour-planner',
//   // function return payload
//   async (planData, thunkAPI) => {
//     try {
//       const result = await tourPlanService.generatePlan(planData);
//       return result;
//     } catch (err) {
//       const message =
//         err.message ||
//         (err.response && err.response.data && err.response.data.message) ||
//         err.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Create slice
// export const tourPlanSlice = createSlice({
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.isError = false;
//       state.message = '';
//     },
//   },
//   // Manage payload life cycle
//   extraReducers: (builder) => {
//     builder
//       .addCase(generateTourPlan.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(generateTourPlan.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//       })
//       .addCase(generateTourPlan.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         state.user = null;
//       });
//   },
// });

// // Export actions, reducer
// export const { reset } = tourPlanSlice.actions;
// export default tourPlanSlice.reducer;
