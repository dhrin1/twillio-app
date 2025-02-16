import axios from "axios";
import LocalStorageUtil from "./local-storage";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const token = LocalStorageUtil.readLocalStorage("access_token");
  if (token) {
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    try {
      const { response } = error;
      if (response.status === 4) {
        LocalStorageUtil.removeLocalStorage("access_token");
      }
    } catch (err) {
      console.error(err);
    }
    throw error;
  }
);

export default axiosClient;
