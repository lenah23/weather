import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string | undefined } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    axios.interceptors.response.use(
      (res) => {
        if (res?.data?.error) {
          return Promise.reject(res?.data?.error);
        }
        return res;
      },
      async (err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          window.location.replace('/');
        }
        return Promise.reject(err);
      }
    );
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        if (config.url !== '/login' && !!config?.headers && token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as any;
      return {
        error: {
          error: err.response?.status,
          result: err.response?.data,
          // err.message
        },
      };
    }
  };

export default axiosBaseQuery;
