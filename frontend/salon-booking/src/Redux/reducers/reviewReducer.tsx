import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { extractErrorMessage } from "../../util/extractErrorFromMessage";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8087";

export interface Review {
  id?: string;
  reviewText?: string;
  rating?: number;
  userId?: string;
  salonId?: number;
  createdAt?: string;
}

interface ReviewRequest {
  reviewText: string;
  rating: number;
}
interface ReviewState {
  review: Review | null;
  isLoading: boolean;
  error: string;
  reviews: Review[];
}

const initialState: ReviewState = {
  isLoading: false,
  error: "",
  reviews: [],
  review: null,
};

export const getAllReviewsBySalonId = createAsyncThunk(
  "review/getAllReviewsBySalonId",
  async (arg: { jwtToken: string; salonId: number }, thunkAPI) => {
    try {
      const response: AxiosResponse<Review[]> = await axios.get(
        BASE_URL + "/api/reviews/salon/" + arg.salonId,
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const reviews: Review[] = response.data;
      console.log(reviews);
      return reviews;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (arg: { jwtToken: string; reviewId: string }, thunkAPI) => {
    try {
      await axios.delete(BASE_URL + "/api/reviews/" + arg.reviewId, {
        headers: {
          Authorization: `Bearer ${arg.jwtToken}`,
        },
      });
      return arg.reviewId;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createReview = createAsyncThunk(
  "review/createReview",
  async (
    arg: { jwtToken: string; salonId: Number; reviewRequest: ReviewRequest },
    thunkAPI
  ) => {
    try {
      const response: AxiosResponse<Review> = await axios.post(
        BASE_URL + "/api/reviews/salon/" + arg.salonId,
        arg.reviewRequest,
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const reviewSlice = createSlice({
  name: "review",
  initialState: initialState,
  reducers: {
    clearReview: (state) => {
      state.reviews = [];
      state.review = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviewsBySalonId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.reviews = action.payload;
      })
      .addCase(getAllReviewsBySalonId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllReviewsBySalonId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.reviews = [];
      });

    builder
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload
        );
      })
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.reviews.push(action.payload);
      })
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const reviewReducer = reviewSlice.reducer;
export const reviewActions = reviewSlice.actions;
export const reviewSelector = (state) => state.reviewReducer;
