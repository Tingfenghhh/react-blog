import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const { VITE_API_WEATHER_URL, VITE_API_WEATHER_LOCATION } = import.meta.env;

const axiosInstance = axios.create({
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  (res: InternalAxiosRequestConfig) => {
    if (/\/weathernow/.test(res.url!)) res.baseURL = VITE_API_WEATHER_URL;
    if (/\/geoapi/.test(res.url!)) res.baseURL = VITE_API_WEATHER_LOCATION;
    if (/\/blog/.test(res.url!))
      res.baseURL = import.meta.env.VITE_API_BLOG_URL;
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default axiosInstance;
