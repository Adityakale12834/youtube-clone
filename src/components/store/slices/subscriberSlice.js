// features/savedVideosSlice.js
import { createSlice } from "@reduxjs/toolkit";

const savedVideosSlice = createSlice({
  name: "subscribers",
  initialState: [],
  reducers: {
    subscribe: (state, action) => {
      const exists = state.some((video) => video.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    },
    unsubscribe: (state, action) => {
      return state.filter((video) => video.id !== action.payload);
    },
    clearSavedVideos: () => {
      return [];
    },
  },
});

export const { subscribe, unsubscribe, clearSavedVideos } =
  savedVideosSlice.actions;
export default savedVideosSlice.reducer;
