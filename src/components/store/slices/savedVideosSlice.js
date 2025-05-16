// features/savedVideosSlice.js
import { createSlice } from "@reduxjs/toolkit";

const savedVideosSlice = createSlice({
  name: "savedVideos",
  initialState: [], // Just an array now
  reducers: {
    addVideo: (state, action) => {
      const exists = state.some((video) => video.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeVideo: (state, action) => {
      return state.filter((video) => video.id !== action.payload);
    },
    clearSavedVideos: () => {
      return [];
    },
  },
});

export const { addVideo, removeVideo, clearSavedVideos } =
  savedVideosSlice.actions;
export default savedVideosSlice.reducer;
