import { Message } from '@arco-design/web-react';
import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { makeUseAxios } from 'axios-hooks';

const { VITE_API_WEATHER_URL, VITE_API_WEATHER_LOCATION } = import.meta.env;

const axiosInstance = axios.create({
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  (res: InternalAxiosRequestConfig) => {
    if (/\/weathernow/.test(res.url!)) res.baseURL = VITE_API_WEATHER_URL;
    if (/\/geoapi/.test(res.url!)) res.baseURL = VITE_API_WEATHER_LOCATION;
    // blog
    // if (/\/blog/.test(res.url!)) {
    //   // 从url删除blog
    //   res.url = res.url!.replace('/blog', '');
    //   res.baseURL = VITE_API_BLOG_URL;
    //   res.headers['Authorization'] = `${token}`;
    //   // 配置跨域
    //   res.headers['Access-Control-Allow-Origin'] = '*';
    // }

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
    Message.error(err.message);
    return Promise.reject(err);
  },
);

// 使用axios-hooks对axios进行封装，以便于在组件中使用，并且可以配置全局响应错误
const useMyAxios = makeUseAxios({
  axios: axiosInstance,
});
//  useMyAxios可以传递三个类型TResponse, TBody, TError，对应返回值，请求体，错误类型
export { useMyAxios };

export default axiosInstance;
