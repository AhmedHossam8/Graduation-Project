import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    studentLogin: builder.mutation({
      query: (payload) => ({
        url: `/student-auth/login`,
        method: 'POST',
        body: payload,
      }),
    }),
    instructorLogin: builder.mutation({
      query: (payload) => ({
        url: `/instructor-auth/login`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
})

export const { useStudentLoginMutation, useInstructorLoginMutation } = apiSlice;
