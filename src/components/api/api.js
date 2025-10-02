// src/utils/api.js
import axios from "axios";

const API_BASE_URL = "https://apis.ccbp.in";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const fetchHomeVideos = async (searchQuery = "") => {
  try {
    const response = await api.get(`/videos/all?search=${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching home videos:", error);
    throw error;
  }
};

export const searchVideos = async (searchQuery = "dhoni") => {
  try {
    const response = await api.get(`/videos/all?search=${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching home videos:", error);
    throw error;
  }
};

export const fetchTrendingVideos = async () => {
  try {
    const response = await api.get("/videos/trending");
    return response.data;
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    throw error;
  }
};

export const fetchGamingVideos = async () => {
  try {
    const response = await api.get("/videos/gaming");
    return response.data;
  } catch (error) {
    console.error("Error fetching gaming videos:", error);
    throw error;
  }
};

export const fetchVideoDetails = async (videoId) => {
  try {
    const response = await api.get(`/videos/${videoId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw error;
  }
};

export default api;
