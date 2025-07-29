import { Token } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { extractErrorMessage } from "../../util/extractErrorFromMessage";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8087";

export interface PaymentOrder {
  id?: number;
  amount?: string;
  paymentOrderStatus?: string;
  paymentMethod?: string;
  paymentLinkId?: string;
  userId?: number;
  bookingId?: number;
  salonId?: number;
}

interface PaymentState {
  // paymentSuccess: boolean;
  payment: PaymentOrder | null;
  isLoading: boolean;
  error: string;
}

const initialState: PaymentState = {
  // paymentSuccess: false,
  payment: null,
  isLoading: false,
  error: "",
};

export const proceedPayment = createAsyncThunk(
  "payment/proceedPayment",
  async (
    arg: { jwtToken: string; paymentId: string; paymentLinkId: string },
    thunkAPI
  ) => {
    try {
      const response: AxiosResponse<boolean> = await axios.patch(
        BASE_URL + "/api/payment/proceed",
        null,
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
          params: {
            paymentId: arg.paymentId,
            paymentLinkId: arg.paymentLinkId,
          },
        }
      );
      const paymentStatus: boolean = response.data;
      console.log(paymentStatus);
      return paymentStatus;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: initialState,
  reducers: {
    // clearPaymentSuccess: (state) => {
    //   state.paymentSuccess = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(proceedPayment.fulfilled, (state, action) => {
        // state.paymentSuccess = action.payload;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(proceedPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(proceedPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        // state.paymentSuccess = false;
      });
  },
});

export const paymentReducer = paymentSlice.reducer;
export const paymentActions = paymentSlice.actions;
export const paymentSelector = (state) => state.paymentReducer;
