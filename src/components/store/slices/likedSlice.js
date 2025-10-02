// features/likedVideosSlice.js
import { createSlice } from "@reduxjs/toolkit";

const likedVideosSlice = createSlice({
  name: "likedVideos",
  initialState: [], // Array of liked video objects
  reducers: {
    // Add a video to liked videos
    likeVideo: (state, action) => {
      const exists = state.some((video) => video.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    },

    // Remove a video from liked videos
    unlikeVideo: (state, action) => {
      return state.filter((video) => video.id !== action.payload.id);
    },

    // Toggle like status - adds if not present, removes if present
    toggleLikeVideo: (state, action) => {
      const index = state.findIndex((video) => video.id === action.payload.id);
      if (index === -1) {
        state.push(action.payload);
      } else {
        state.splice(index, 1);
      }
    },

    // Clear all liked videos
    clearLikedVideos: () => {
      return [];
    },
  },
});

export const { likeVideo, unlikeVideo, toggleLikeVideo, clearLikedVideos } =
  likedVideosSlice.actions;
export default likedVideosSlice.reducer;
