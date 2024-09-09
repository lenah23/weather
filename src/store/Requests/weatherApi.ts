import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../API';
import { IGetCurrentWeatherData, IGetWeatherDataResp } from '../interfaces';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  tagTypes: ['weather'],
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<
      IGetWeatherDataResp | undefined,
      IGetCurrentWeatherData
    >({
      query: ({ location }) => ({
        url: `/data/2.5/weather?hourly&days=5&q=${location}&appid=${process.env.REACT_APP_API_KEY}`,
        method: 'GET',
      }),
      providesTags: ['weather'],
    }),
    getDailyWeather: builder.query<
      IGetWeatherDataResp | undefined,
      IGetCurrentWeatherData
    >({
      query: ({ location }) => ({
        url: `/data/2.5/forecast?hourly&q=${location}&appid=${process.env.REACT_APP_API_KEY}`,
        method: 'GET',
      }),
      providesTags: ['weather'],
    }),
  }),
});

export const { useGetCurrentWeatherQuery, useGetDailyWeatherQuery } =
  weatherApi;
