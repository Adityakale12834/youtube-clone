// store.js
import { configureStore } from "@reduxjs/toolkit";
import savedVideosReducer from "./slices/savedVideosSlice";
import subscribers from "./slices/subscriberSlice";
import libraryReducer from "./slices/librarySlice";
export const store = configureStore({
  reducer: {
    savedVideos: savedVideosReducer,
    subscriber: subscribers,
    library: libraryReducer,
  },
});
