// features/librarySlice.js
import { createSlice } from "@reduxjs/toolkit";

const librarySlice = createSlice({
  name: "library",
  initialState: [],
  reducers: {
    addToLibrary: (state, action) => {
      const videoExists = state.some((video) => video.id === action.payload.id);
      if (!videoExists) {
        state.push(action.payload);
      }
    },
    removeFromLibrary: (state, action) => {
      return state.filter((video) => video.id !== action.payload);
    },
    clearLibrary: () => {
      return [];
    },
  },
});

export const { addToLibrary, removeFromLibrary, clearLibrary } =
  librarySlice.actions;
export default librarySlice.reducer;
