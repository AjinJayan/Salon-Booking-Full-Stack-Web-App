import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { SignRequest } from "./authReducer";
import { AuthResponse } from "./authReducer";
import { NavigateFunction } from "react-router-dom";
import { extractErrorMessage } from "../../util/extractErrorFromMessage";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8087";

export interface Salon {
  id?: string;
  name?: string;
  images?: string[];
  address?: string;
  phoneNumber?: string;
  email?: string;
  city?: string;
  openTime?: string;
  closeTime?: string;
  ownerId?: number;
}

interface SalonState {
  searchKeyword: string;
  searchSalons: Salon[];
  salon: Salon | null;
  isLoading: boolean;
  error: string;
  salons: Salon[];
}

const initialState: SalonState = {
  searchKeyword: "",
  searchSalons: [],
  salon: null,
  isLoading: false,
  error: "",
  salons: [],
};

export const getAllSalons = createAsyncThunk(
  "salon/getAllSalon",
  async (arg: { jwtToken: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<Salon[]> = await axios.get(
        BASE_URL + "/api/salons",
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const salons: Salon[] = response.data;
      //   console.log(salons);
      return salons;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSalonsByKeyword = createAsyncThunk(
  "salon/getSalonsByKeyword",
  async (arg: { jwtToken: string; keyword: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<Salon[]> = await axios.get(
        BASE_URL + "/api/salons/search",
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
          params: {
            keyword: arg.keyword,
          },
        }
      );
      const salons: Salon[] = response.data;
      console.log(salons);
      return salons;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createSalon = createAsyncThunk(
  "salon/createSalon",
  async (
    arg: { user: SignRequest; salon: Salon; navigate: NavigateFunction },
    thunkAPI
  ) => {
    try {
      const authResponse: AxiosResponse<AuthResponse> = await axios.post(
        BASE_URL + "/auth/signup",
        arg.user
      );
      const authResponseData: AuthResponse = authResponse.data;
      const jwt = authResponseData.jwt;
      localStorage.setItem("jwt", jwt);

      const response: AxiosResponse<Salon> = await axios.post(
        BASE_URL + "/api/salons",
        arg.salon,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const salon: Salon = response.data;
      // console.log(salon);
      arg.navigate("/salon-dashboard");
      return salon;
    } catch (error) {
      // console.log(error);
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSalonById = createAsyncThunk(
  "salon/getSalonById",
  async (arg: { salonId: number; jwtToken: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<Salon> = await axios.get(
        BASE_URL + "/api/salons/" + arg.salonId,
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const salon: Salon = response.data;
      //   console.log(salon);
      return salon;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSalonByOwnerId = createAsyncThunk(
  "salon/getSalonByOwnerId",
  async (arg: { jwtToken: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<Salon> = await axios.get(
        BASE_URL + "/api/salons/owner",
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const salon: Salon = response.data;
      //   console.log(salon);
      return salon;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const salonSlice = createSlice({
  name: "salon",
  initialState: initialState,
  reducers: {
    clearSalon: (state) => {
      state.salon = null;
      state.salons = [];
      state.searchSalons = [];
      state.searchKeyword = "";
    },

    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSalons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.salons = action.payload;
      })
      .addCase(getAllSalons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSalons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.salons = [];
      });

    builder
      .addCase(getSalonById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.salon = action.payload;
      })
      .addCase(getSalonById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalonById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.salon = null;
      });

    builder
      .addCase(getSalonByOwnerId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.salon = action.payload;
      })
      .addCase(getSalonByOwnerId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalonByOwnerId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.salon = null;
      });

    builder
      .addCase(createSalon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.salon = action.payload;
      })
      .addCase(createSalon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSalon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.salon = null;
      });

    builder
      .addCase(getSalonsByKeyword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.searchSalons = action.payload;
      })
      .addCase(getSalonsByKeyword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalonsByKeyword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.searchSalons = [];
      });
  },
});

export const salonReducer = salonSlice.reducer;
export const salonActions = salonSlice.actions;
export const salonSelector = (state) => state.salonReducer;
