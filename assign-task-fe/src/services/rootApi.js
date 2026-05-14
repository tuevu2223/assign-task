import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (build) => ({
    register: build.mutation({
      query: ({ fullName, email, password }) => {
        return {
          url: `/signup`,
          body: { fullName, email, password },
          method: "POST",
        };
      },
    }),
    login: build.mutation({
      query: ({ email, password }) => {
        return {
          url: `/login`,
          body: { email, password },
          method: "POST",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterMutation, useLoginMutation } = rootApi;
