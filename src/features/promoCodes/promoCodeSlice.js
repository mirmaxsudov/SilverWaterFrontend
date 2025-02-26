import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../api/request";

const initialState = {
  promoCodes: [],
  total: 0,
  status: "idle", // 'loading', 'succeeded', 'failed'
  error: null,
};

export const fetchPromoCodes = createAsyncThunk(
  "promoCodes/fetchPromoCodes",
  async ({ page, size, search, active, deleted }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", page); // backend expects zero-based page index
      queryParams.append("size", size);
      if (search && search.trim().length > 0) {
        queryParams.append("query", search.trim());
      }
      // Only add filters if they are not set to "ALL"
      if (active && active !== "ALL") {
        queryParams.append("active", active);
      }
      if (deleted && deleted !== "ALL") {
        queryParams.append("delete", deleted);
      }
      const res = await $api.get(
        `/api/v1/promo-codes/page?${queryParams.toString()}`
      );
      // Expecting response in format: { promoCodes: [...], total: number }
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch promo codes");
    }
  }
);

const promoCodeSlice = createSlice({
  name: "promoCode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromoCodes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPromoCodes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.promoCodes = action.payload.promoCodes;
        state.total = action.payload.total;
      })
      .addCase(fetchPromoCodes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default promoCodeSlice.reducer;
