import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api, BASE_API_URL } from "../../api/request";

export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async (_, { rejectWithValue }) => {
    try {
      console.log(BASE_API_URL);

      const res = await $api.get(`${BASE_API_URL}/api/v1/application/all`);
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch applications");
    }
  },
);

export const confirmApplication = createAsyncThunk(
  "application/confirmApplication",
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.post(
        `${BASE_API_URL}/api/v1/application/confirm/${id}`,
        {
          id,
        },
      );
      if (!response.ok) return rejectWithValue("Failed to confirm application");

      return response.data;
    } catch (error) {
      return rejectWithValue("Network error");
    }
  },
);

const initialState = {
  data: [],
  filteredData: [],
  loading: false,
  error: null,
  searchQuery: "",
  order: "asc", // "asc" or "desc"
  filterStatus: "all", // "all", "true", or "false" (filter by app.answered value)
};

const filterAndSortData = (state) => {
  let filtered = state.data;

  // Filter by search query on fullName (if searchQuery is not empty)
  if (state.searchQuery) {
    filtered = filtered.filter(
      (app) =>
        app.fullName.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        app.phoneNumber.toLowerCase().includes(state.searchQuery.toLowerCase()),
    );
  }

  // Filter by status if not "all"
  if (state.filterStatus !== "all") {
    // Convert string to boolean: "true" => true, "false" => false
    const statusBool = state.filterStatus === "true";
    filtered = filtered.filter((app) => app.answered === statusBool);
  }

  // Sort by id (or any other field such as a date) based on order
  filtered.sort((a, b) => {
    if (state.order === "asc") {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

  state.filteredData = filtered;
};

const applicationsSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    searchApplications: (state, action) => {
      state.searchQuery = action.payload;
      filterAndSortData(state);
    },
    sortApplications: (state, action) => {
      state.order = action.payload;
      filterAndSortData(state);
    },
    filterApplicationsByStatus: (state, action) => {
      state.filterStatus = action.payload;
      filterAndSortData(state);
    },
    resetFilters: (state) => {
      state.searchQuery = "";
      state.order = "asc";
      state.filterStatus = "all";
      state.filteredData = state.data;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch applications cases
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        filterAndSortData(state);
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(confirmApplication.fulfilled, (state, action) => {
        const updatedApp = action.payload;
        const index = state.data.findIndex((app) => app.id === updatedApp.id);

        if (index !== -1) state.data[index].answered = true;

        filterAndSortData(state);
      })
      .addCase(confirmApplication.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  searchApplications,
  sortApplications,
  filterApplicationsByStatus,
  resetFilters,
} = applicationsSlice.actions;
export default applicationsSlice.reducer;
