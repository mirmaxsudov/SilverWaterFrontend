import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const promoCodeInitialState = {
  data: [],
};

export const fetchPromoCodes = createAsyncThunk(
  "promoCodes/fetchPromoCodes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/promo-codes");
      return await res.json();
    } catch (error) {
      return rejectWithValue("Failed to fetch applications");
    }
  },
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
