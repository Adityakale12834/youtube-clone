import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchVideos as apiSearchVideos } from "../../api/api"; // Renamed import to avoid naming conflict

// Note: Changed to lowercase 's' to match the case used in extraReducers
export const searchVideos = createAsyncThunk(
  "videos/search",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await apiSearchVideos(searchQuery);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    searchResults: [],
    loading: false,
    error: null,
    searchQuery: "",
  },
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        state.searchQuery = action.meta.arg;
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults } = videoSlice.actions;
export default videoSlice.reducer;
