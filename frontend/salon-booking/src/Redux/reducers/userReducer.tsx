import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../util/extractErrorFromMessage";

const BASE_URL = "http://localhost:8087";

export interface User {
  id?: string;
  username?: string;
  email?: string;
  role?: string;
  fullName?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const UserRole = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  SALON_OWNER: "SALON_OWNER",
};

interface AuthState {
  user: User | null;
  authUser: User | null;
  isLoading: boolean;
  error: string;
  customers: User[];
}

const initialState: AuthState = {
  user: null,
  authUser: null,
  isLoading: false,
  error: "",
  customers: [],
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (
    arg: { jwtToken: string; navigate: NavigateFunction; requestFrom?: string },
    thunkAPI
  ) => {
    try {
      const userResponse: AxiosResponse<User> = await axios.get(
        BASE_URL + "/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const authUser: User = userResponse.data;
      //   console.log(user);
      if (arg.requestFrom == "loginPage" || arg.requestFrom == "signupPage") {
        if (authUser.role === UserRole.ADMIN) arg.navigate("/admin");
        else if (authUser.role === UserRole.SALON_OWNER)
          arg.navigate("/salon-dashboard");
        else arg.navigate("/");
      }
      return authUser;
    } catch (error) {
      if (arg.navigate) arg.navigate("/login");
      // toast.error(extractErrorMessage(error.response.data.message), {
      //   autoClose: 1000,
      //   hideProgressBar: true,
      // });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (arg: { jwtToken: string; userId: number }, thunkAPI) => {
    try {
      const userResponse: AxiosResponse<User> = await axios.get(
        BASE_URL + "/api/users/" + arg.userId,
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const user: User = userResponse.data;
      //   console.log(user);

      return user;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clearUser: (state) => {
      state.authUser = null;
      state.customers = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.authUser = action.payload;
    });
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
      state.authUser = null;
    });

    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
    });
    builder.addCase(getUserById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
      state.user = null;
    });
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelector = (state) => state.userReducer;
