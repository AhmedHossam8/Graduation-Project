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

    getCourses: builder.query({
      query: () => ({
        url: `/course/search`,
        method: 'GET',
      }),
    }),

    enrollStudentInCourse: builder.mutation({
      query: ({ registrationNumber, course }) => ({
        url: `/student/enroll`,
        method: 'POST',
        body: {
          registrationNumber,
          course
        }
      }),
    }),

    getCoursesEnrolledByStudent: builder.query({
      query: (registrationNumber) => ({
        url: `/student/courses/${registrationNumber}`,
        method: 'GET',
      }),
    }),

    getCoursesByInstructorId: builder.query({
      query: (id) => ({
        url: `/instructor/courses/${id}`,
        method: 'GET',
      }),
    }),

    // New endpoint for fetching students by instructor ID
    getStudentsByInstructorId: builder.query({
      query: (instructorId) => ({
        url: `/instructor/students/${instructorId}`,
        method: 'GET',
      }),
    }),

    // New endpoint for submitting grades
    submitGrade: builder.mutation({
      query: ({ instructorId, courseId, studentId, grade }) => ({
        url: `/instructor/submit-grade/${studentId}`,
        method: 'POST',
        body: { instructorId, courseId, grade },
      }),
    }),

  }),
});

export const {
  useStudentLoginMutation,
  useInstructorLoginMutation,
  useGetCoursesQuery,
  useEnrollStudentInCourseMutation,
  useGetCoursesEnrolledByStudentQuery,
  useGetCoursesByInstructorIdQuery,
  useGetStudentsByInstructorIdQuery,
  useSubmitGradeMutation,
} = apiSlice;
