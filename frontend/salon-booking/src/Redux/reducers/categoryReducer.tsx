import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { extractErrorMessage } from "../../util/extractErrorFromMessage";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8087";

export interface Category {
  id?: number;
  name?: string;
  image?: string;
  salonId?: number;
}

interface CategoryState {
  category: Category | null;
  isLoading: boolean;
  error: string;
  categories: Category[];
}

const initialState: CategoryState = {
  category: null,
  isLoading: false,
  error: "",
  categories: [],
};

export const getAllCategoriesBySalon = createAsyncThunk(
  "category/getAllCategoriesBySalon",
  async (arg: { jwtToken: string; salonId: number }, thunkAPI) => {
    try {
      const response: AxiosResponse<Category[]> = await axios.get(
        BASE_URL + "/api/categories/salon/" + arg.salonId,
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const categories: Category[] = response.data;
      //   console.log(salons);
      return categories;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (arg: { jwtToken: string; category: Category }, thunkAPI) => {
    try {
      const response: AxiosResponse<Category> = await axios.post(
        BASE_URL + "/api/categories/salon-owner",
        arg.category,
        {
          headers: {
            Authorization: `Bearer ${arg.jwtToken}`,
          },
        }
      );
      const category: Category = response.data;
      //   console.log(salons);
      return category;
    } catch (error) {
      toast.error(extractErrorMessage(error.response.data.message), {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    clearCategory: (state) => {
      state.categories = [];
      state.category = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoriesBySalon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.categories = action.payload;
      })
      .addCase(getAllCategoriesBySalon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategoriesBySalon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.categories = [];
      });
    builder
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.category = action.payload;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.category = null;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
export const categoryActions = categorySlice.actions;
export const categorySelector = (state) => state.categoryReducer;
