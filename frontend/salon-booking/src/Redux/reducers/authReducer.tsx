import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";
import { extractErrorMessage } from "../../util/extractErrorFromMessage";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8087";

// export interface User {
//   id?: string;
//   username?: string;
//   email?: string;
//   role?: string;
//   fullName?: string;
//   phone?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

const UserRole = Object.freeze({
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  SALON_OWNER: "SALON_OWNER",
});

interface AuthState {
  //   user: User | null;
  isLoading: boolean;
  error: string;
  //   customers: User[];
  jwt: string;
  refreshToken: string;
  expiryIn: string;
  refreshExpiryIn: string;
}
export interface SignRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

// const UserRole = {
//   CUSTOMER: "CUSTOMER",
//   ADMIN: "ADMIN",
//   SALON_OWNER: "SALON_OWNER",
// };

export interface AuthResponse {
  jwt: string;
  refreshToken: string;
  message: string;
  title: string;
  userRole: string;
  expiryIn: string;
  refreshExpiryIn: string;
}

const initialState: AuthState = {
  //   user: null,
  isLoading: false,
  error: "",
  //   customers: [],
  jwt: "",
  refreshToken: "",
  expiryIn: "",
  refreshExpiryIn: "",
};

export const userLogin = createAsyncThunk(
  "auth/login",
  async (arg: { loginRequest: LoginRequest }, thunkAPI) => {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(
        BASE_URL + "/auth/login",
        arg.loginRequest
      );
      const authResponse: AuthResponse = response.data;

      //   const userResponse: AxiosResponse<User> = await axios.get(
      //     BASE_URL + "/api/users/profile",
      //     {
      //       headers: {
      //         Authorization: `Bearer ${authResponse.jwt}`,
      //       },
      //     }
      //   );
      //   const user: User = userResponse.data;
      //   console.log(authResponse);
      //   console.log(user);

      //   if (user.role === UserRole.ADMIN) arg.navigate("/admin");
      //   else if (user.role === UserRole.SALON_OWNER)
      //     arg.navigate("/salon-dashboard");
      //   else arg.navigate("/");
      //   return { user, authResponse };
      return { authResponse };
    } catch (error) {
      toast.error("Invalid username or password", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userSignUp = createAsyncThunk(
  "auth/signup",
  async (arg: { signUpRequest: SignRequest }, thunkAPI) => {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(
        BASE_URL + "/auth/signup",
        arg.signUpRequest
      );
      const authResponse: AuthResponse = response.data;
      localStorage.setItem("jwt", authResponse.jwt);
      localStorage.setItem("refreshToken", authResponse.refreshToken);
      return { authResponse };
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getNewTokenFromRefreshToken = createAsyncThunk(
  "auth/getNewTokenFromRefreshToken",
  async (
    arg: {
      jwtToken: string;
      refreshToken: string;
      navigate?: NavigateFunction;
      handleLogout?: () => void;
    },
    thunkAPI
  ) => {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.get(
        BASE_URL + "/auth/access-token/refresh-token/" + arg.refreshToken,
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const authResponse: AuthResponse = response.data;
      // console.log(authResponse);
      return { authResponse };
    } catch (error) {
      toast.info("Session timeout, logging out", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      arg.handleLogout!();
      arg.navigate!("/login");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.jwt = "";
      state.refreshToken = "";
      state.expiryIn = "";
      state.refreshExpiryIn = "";
      localStorage.removeItem("jwt");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.jwt = action.payload.authResponse.jwt;
        state.expiryIn = action.payload.authResponse.expiryIn;
        state.refreshToken = action.payload.authResponse.refreshToken;
        state.refreshExpiryIn = action.payload.authResponse.refreshExpiryIn;
        //   state.user = action.payload.user;
        localStorage.setItem("jwt", action.payload.authResponse.jwt);
        localStorage.setItem(
          "refreshToken",
          action.payload.authResponse.refreshToken
        );
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.jwt = "";
        state.refreshToken = "";
        state.expiryIn = "";
        state.refreshExpiryIn = "";
        //   state.user = null;
        localStorage.removeItem("jwt");
        localStorage.removeItem("refreshToken");
      });

    builder
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.jwt = action.payload.authResponse.jwt;
        state.expiryIn = action.payload.authResponse.expiryIn;
        state.refreshToken = action.payload.authResponse.refreshToken;
        state.refreshExpiryIn = action.payload.authResponse.refreshExpiryIn;
        localStorage.setItem("jwt", action.payload.authResponse.jwt);
        localStorage.setItem(
          "refreshToken",
          action.payload.authResponse.refreshToken
        );
      })
      .addCase(userSignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.jwt = "";
        state.refreshToken = "";
        state.expiryIn = "";
        state.refreshExpiryIn = "";
        localStorage.removeItem("jwt");
        localStorage.removeItem("refreshToken");
      });

    builder
      .addCase(getNewTokenFromRefreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.jwt = action.payload.authResponse.jwt;
        state.expiryIn = action.payload.authResponse.expiryIn;
        state.refreshToken = action.payload.authResponse.refreshToken;
        state.refreshExpiryIn = action.payload.authResponse.refreshExpiryIn;
        localStorage.setItem("jwt", action.payload.authResponse.jwt);
        localStorage.setItem(
          "refreshToken",
          action.payload.authResponse.refreshToken
        );
      })
      .addCase(getNewTokenFromRefreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNewTokenFromRefreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.jwt = "";
        state.refreshToken = "";
        state.expiryIn = "";
        state.refreshExpiryIn = "";
        localStorage.removeItem("jwt");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const authSelector = (state) => state.authReducer;
