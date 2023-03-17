import Axios from "axios";

//export const API_URL = "http://localhost:4741/api";
export const API_URL = "https://server-ep-01.onrender.com/api";

const instance = Axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalResponse = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetru
    ) {
      originalResponse._isRetru = true;
      try {
        const response = await Axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return instance.request(originalResponse);
      } catch (e) {}
    }
    throw error;
  }
);

export default instance;
