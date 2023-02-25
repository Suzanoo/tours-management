import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

/*
1.Fetch user from localStorage & cast to JSON object
2.Initialize state
3.Create async action-reducer:
  -register
  -login
  -logout
4.Create slice
*/

// Fetch user from localStorage & cast to JSON object
const user = JSON.parse(localStorage.getItem('user'));

// Initialize state
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create async action-reducer: register
export const register = createAsyncThunk(
  // async action type
  'auth/register',
  // function return payload
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create async action-reducer: login
export const login = createAsyncThunk(
  // async action type
  'auth/login',
  // function return payload
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      // console.log(err.response.data);
      // alert(err.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create async action-reducer: logout
export const logout = createAsyncThunk(
  // async action type
  'auth/logout',
  // function return payload
  async () => {
    await authService.logout();
  }
);

// Create async action-reducer: forgot password action
export const forgotPwd = createAsyncThunk(
  // async action type
  'auth/forgotPwd',
  // function return payload
  async (user, thunkAPI) => {
    try {
      return await authService.forgotPwd(user);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      // console.log(err.response.data);
      // alert(err.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create async action-reducer: reset password action
export const resetPwd = createAsyncThunk(
  // async action type
  'auth/resetPwd',
  // function return payload
  async (data, thunkAPI) => {
    try {
      return await authService.resetPwd(data);
    } catch (err) {
      const message =
        err.message ||
        (err.response && err.response.data && err.response.data.message) ||
        err.toString();
      // console.log(err.response.data);
      // alert(err.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  // Manage payload life cycle
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(forgotPwd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPwd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(forgotPwd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(resetPwd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPwd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(resetPwd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

// Export actions, reducer
export const { reset } = authSlice.actions;
export default authSlice.reducer;
