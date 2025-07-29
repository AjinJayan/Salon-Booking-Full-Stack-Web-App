import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../util/extractErrorFromMessage";

const BASE_URL = "http://localhost:8087";

export interface ServiceOffering {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  duration?: number;
  categoryId?: number;
  image?: string;
  salonId?: number;
}

interface ServiceOfferingState {
  serviceOffering: ServiceOffering | null;
  isLoading: boolean;
  error: string;
  serviceOfferings: ServiceOffering[];
}

const initialState: ServiceOfferingState = {
  isLoading: false,
  error: "",
  serviceOfferings: [],
  serviceOffering: null,
};

export const getAllServiceOfferingsBySalonId = createAsyncThunk(
  "serviceOffering/getAllServiceOfferingsBySalonId",
  async (
    arg: { jwtToken: string; salonId: number; categoryId?: number },
    thunkAPI
  ) => {
    try {
      const response: AxiosResponse<ServiceOffering[]> = await axios.get(
        BASE_URL + "/api/service-offerings/salon/" + arg.salonId,
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
          params: {
            categoryId: arg.categoryId,
          },
        }
      );
      const serviceOfferings: ServiceOffering[] = response.data;
      console.log(serviceOfferings);
      return serviceOfferings;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createServiceOffering = createAsyncThunk(
  "serviceOffering/createServiceOffering",
  async (
    arg: { jwtToken: string; serviceOffering: ServiceOffering },
    thunkAPI
  ) => {
    try {
      const response: AxiosResponse<ServiceOffering> = await axios.post(
        BASE_URL + "/api/service-offerings/salon-owner",
        arg.serviceOffering,
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const serviceOffering: ServiceOffering = response.data;
      console.log(serviceOffering);
      return serviceOffering;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const serviceOfferingSlice = createSlice({
  name: "serviceOffering",
  initialState: initialState,
  reducers: {
    clearServiceOffering: (state) => {
      state.serviceOfferings = [];
      state.serviceOffering = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServiceOfferingsBySalonId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.serviceOfferings = action.payload;
      })
      .addCase(getAllServiceOfferingsBySalonId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllServiceOfferingsBySalonId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.serviceOfferings = [];
      });

    builder
      .addCase(createServiceOffering.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.serviceOffering = action.payload;
      })
      .addCase(createServiceOffering.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createServiceOffering.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.serviceOffering = null;
      });
  },
});

export const serviceOfferingReducer = serviceOfferingSlice.reducer;
export const serviceOfferingActions = serviceOfferingSlice.actions;
export const serviceOfferingSelector = (state) => state.serviceOfferingReducer;
