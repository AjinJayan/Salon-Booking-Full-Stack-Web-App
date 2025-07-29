import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Booking } from "./bookingReducer";
import store, { RootState } from "../store";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../util/extractErrorFromMessage";
const BASE_URL = "http://localhost:8087";

export interface Notification {
  id?: number;
  type?: string;
  isRead?: boolean;
  description?: string;
  userId?: number;
  salonId?: number;
  bookingId?: number;
  createdAt: string;
  booking: Booking;
}

interface NotificationState {
  notifications: Notification[];
  isLoading: boolean;
  error: string;
  isReadCount: number;
}

const initialState: NotificationState = {
  notifications: [],
  isLoading: false,
  error: "",
  isReadCount: 0,
};

export const getAllNotificationByUserId = createAsyncThunk(
  "notification/getAllNotificationByUserId",
  async (
    arg: {
      jwtToken: string;
      userId: number;
    },
    thunkAPI
  ) => {
    try {
      const response: AxiosResponse<Notification[]> = await axios.get(
        BASE_URL + "/api/notifications/user/" + arg.userId,
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const notifications: Notification[] = response.data;
      console.log(notifications);
      return notifications;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllNotificationBySalonId = createAsyncThunk(
  "notification/getAllNotificationBySalonId",
  async (
    arg: {
      jwtToken: string;
      salonId: number;
    },
    thunkAPI
  ) => {
    try {
      const response: AxiosResponse<Notification[]> = await axios.get(
        BASE_URL + "/api/notifications/salon-owner/salon/" + arg.salonId,
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const notifications: Notification[] = response.data;
      console.log(notifications);
      return notifications;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const getNotificationReadCount = createAsyncThunk<
//   Notification[],
//   { jwtToken: string; userId: number },
//   { state: RootState }
// >(
//   "notification/getNotificationReadCount",
//   async (
//     arg: {
//       jwtToken: string;
//       userId: number;
//     },
//     thunkAPI
//   ) => {
//     try {
//       // const response: AxiosResponse<Notification[]> = await axios.get(
//       //   BASE_URL + "/api/notifications/user/" + arg.userId,
//       //   {
//       //     headers: {
//       //       Authorization: `Bearer ${arg.jwtToken}`,
//       //     },
//       //   }
//       // );
//       // const notifications: Notification[] = response.data;
//       // console.log(notifications);
//       // return notifications;
//       thunkAPI.dispatch(
//         getAllNotificationByUserId({
//           jwtToken: arg.jwtToken,
//           userId: arg.userId,
//         })
//       );
//       return thunkAPI.getState().notificationReducer.notifications;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const markNotificationAsRead = createAsyncThunk(
  "notification/markNotificationAsRead",
  async (
    arg: {
      jwtToken: string;
      notificationId: number;
    },
    thunkAPI
  ) => {
    try {
      const response: AxiosResponse<Notification> = await axios.put(
        BASE_URL + "/api/notifications/" + arg.notificationId + "/read",
        null,
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const notification: Notification = response.data;
      console.log(notification);
      return notification;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    clearNotification: (state) => {
      state.notifications = [];
      state.isReadCount = 0;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
      state.isReadCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotificationByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.notifications = action.payload;

        state.isReadCount = action.payload.reduce((count, notification) => {
          if (!notification.isRead) {
            return count + 1;
          }
          return count;
        }, 0);
      })
      .addCase(getAllNotificationByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllNotificationByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isReadCount = 0;
      });

    builder
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.notifications.forEach((notification) => {
          if (notification.id === action.payload.id) {
            notification.isRead = true;
          }
        });
        state.isReadCount -= 1;
      })
      .addCase(markNotificationAsRead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getAllNotificationBySalonId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.notifications = action.payload;
        state.isReadCount = action.payload.reduce((count, notification) => {
          if (!notification.isRead) {
            return count + 1;
          }
          return count;
        }, 0);
      })
      .addCase(getAllNotificationBySalonId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllNotificationBySalonId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isReadCount = 0;
      });

    // builder
    //   .addCase(getNotificationReadCount.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.error = "";
    //     state.isReadCount = action.payload.reduce((count, notification) => {
    //       if (!notification.isRead) {
    //         return count + 1;
    //       }
    //       return count;
    //     }, 0);
    //   })
    //   .addCase(getNotificationReadCount.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(getNotificationReadCount.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload as string;
    //     state.isReadCount = 0;
    //   });
  },
});

export const notificationReducer = notificationSlice.reducer;
export const notificationActions = notificationSlice.actions;
export const notificationSelector = (state) => state.notificationReducer;
