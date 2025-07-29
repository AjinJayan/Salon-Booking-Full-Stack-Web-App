import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Salon } from "./salonReducer";
import { ServiceOffering } from "./serviceOfferingReducer";
import { User } from "./userReducer";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../util/extractErrorFromMessage";
import dayjs from "dayjs";

const BASE_URL = "http://localhost:8087";

export interface Booking {
  id?: number;
  startTime?: string;
  endTime?: string;
  totalPrice?: number;
  servicesIds?: number[];
  customerId?: number;
  salonId?: number;
  bookingStatus?: string;
  salonDto: Salon;
  serviceDtos: ServiceOffering[];
  userDto: User;
}

interface PaymentLinkResponse {
  paymentLinkId: string;
  paymentLinkUrl: string;
}
interface SalonReport {
  salonId: number;
  salonName: string;
  totalEarnings: number;
  totalBookings: number;
  cancelledBookings: number;
  totalRefund: number;
}

interface BookingState {
  salonReport: SalonReport | null;
  booking: Booking | null;
  isLoading: boolean;
  error: string;
  bookings: Booking[];
  earningsChartData: any[];
  bookingsChartData: any[];
}

interface BookingRequest {
  startTime: string;
  serviceIds: number[];
}

// interface ChartData {
//   key: string;
//   value: object;
// }

const initialState: BookingState = {
  salonReport: null,
  booking: null,
  isLoading: false,
  error: "",
  bookings: [],
  earningsChartData: [],
  bookingsChartData: [],
};

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (
    arg: {
      jwtToken: string;
      bookingRequest: BookingRequest;
      salonId: number;
      paymentMethod: string;
    },
    thunkAPI
  ) => {
    try {
      const response: AxiosResponse<PaymentLinkResponse> = await axios.post(
        BASE_URL + "/api/bookings",
        arg.bookingRequest,
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
          params: {
            salonId: arg.salonId,
            paymentMethod: arg.paymentMethod,
          },
        }
      );
      const paymentLinkResponse: PaymentLinkResponse = response.data;
      console.log(paymentLinkResponse);
      window.location.href = paymentLinkResponse.paymentLinkUrl;
      return paymentLinkResponse;
    } catch (error) {
      console.log(error);
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllBookingsByUserId = createAsyncThunk(
  "booking/getAllBookingsByUserId",
  async (arg: { jwtToken: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<Booking[]> = await axios.get(
        BASE_URL + "/api/bookings/customer",
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const bookings: Booking[] = response.data;
      // console.log(bookings);
      return bookings;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getEarningsChartData = createAsyncThunk(
  "booking/getEarningsChartData",
  async (arg: { jwtToken: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<any[]> = await axios.get(
        BASE_URL + "/api/bookings/chart/earnings",
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const earningsChartData: any[] = response.data;
      // console.log(earningsChartData);
      return earningsChartData;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getBookingsChartData = createAsyncThunk(
  "booking/getBookingsChartData",
  async (arg: { jwtToken: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<any[]> = await axios.get(
        BASE_URL + "/api/bookings/chart/bookings",
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const bookingsChartData: any[] = response.data;
      // console.log(bookingsChartData);
      return bookingsChartData;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSalonReport = createAsyncThunk(
  "booking/getSalonReport",
  async (arg: { jwtToken: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<SalonReport> = await axios.get(
        BASE_URL + "/api/bookings/report",
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const salonReport: SalonReport = response.data;
      // console.log(salonReport);
      return salonReport;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllBookingsBySalon = createAsyncThunk(
  "booking/getAllBookingsBySalon",
  async (arg: { jwtToken: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<Booking[]> = await axios.get(
        BASE_URL + "/api/bookings/salon",
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const bookings: Booking[] = response.data;
      // console.log(bookings);
      return bookings;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: {
    clearBooking: (state) => {
      state.bookings = [];
      state.booking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getAllBookingsByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.bookings = action.payload;
        state.bookings.sort((a, b) => {
          return dayjs(b.startTime).diff(dayjs(a.startTime));
        });
      })
      .addCase(getAllBookingsByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBookingsByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.bookings = [];
      });

    builder
      .addCase(getAllBookingsBySalon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.bookings = action.payload;
        state.bookings.sort((a, b) => {
          return dayjs(b.startTime).diff(dayjs(a.startTime));
        });
      })
      .addCase(getAllBookingsBySalon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBookingsBySalon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.bookings = [];
      });

    builder
      .addCase(getSalonReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.salonReport = action.payload;
      })
      .addCase(getSalonReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalonReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.salonReport = null;
      });

    builder
      .addCase(getEarningsChartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.earningsChartData = action.payload;
      })
      .addCase(getEarningsChartData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEarningsChartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.earningsChartData = [];
      });

    builder
      .addCase(getBookingsChartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.bookingsChartData = action.payload;
      })
      .addCase(getBookingsChartData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookingsChartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.bookingsChartData = [];
      });
  },
});

export const bookingReducer = bookingSlice.reducer;
export const bookingActions = bookingSlice.actions;
export const bookingSelector = (state) => state.bookingReducer;
