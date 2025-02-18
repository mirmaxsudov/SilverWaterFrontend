import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api, BASE_API_URL } from "../../api/request";

const promoCodeInitialState = {
  data: [],
};

export const fetchPromoCodes = createAsyncThunk(
  "promoCodes/fetchPromoCodes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await $api.get(`${BASE_API_URL}/api/v1/promo-codes`);
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch applications");
    }
  }
);

const promoCodeSlice = createSlice({
  name: "promoCode",
  initialState: promoCodeInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPromoCodes.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

// export const {} = promoCodeSlice.actions;
export default promoCodeSlice.reducer;
