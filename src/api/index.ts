import axios from "axios";

//export const API_URL = "http://localhost:4741/api";
export const API_URL = "http://80.90.186.196:5000/api";
axios.defaults.withCredentials = true;
const instance = axios.create({
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: API_URL,
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
    debugger
    const originalResponse = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetru
    ) {
      originalResponse._isRetru = true;
      try {
        const response = await axios.get(`${API_URL}/refresh`, {
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
