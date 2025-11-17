import axios from "axios";

const api = axios.create({
  baseURL: "https://thesmartcards.in/sc20test24/api/",   // ← Change this
  timeout: 10000,
});

// Add token automatically (if using login token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  // LOGIN API
  login(data) {
    return api.post("/login-submit", data);
  },

  // REGISTER API
  register(data) {
    return api.post("/register", data);
  },

  getCard() {
    return api.get("/user/card");
  },
  // EXAMPLE GET API
  getProfile() {
    return api.get("/profile");
  },

  // UPDATE PROFILE
  updateProfile(data) {
    return api.post("/profile/update", data);
  },
  verifyOtp(data) {
    return api.post("/verifyOtp", data);
  },
  // ANY COMMON API YOU WANT
  post(url, data) {
    return api.post(url, data);
  },

  get(url) {
    return api.get(url);
  },
};
