import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const rootApi = createApi({
  reducerPath: "rootApi",
  tagTypes: ["my-tasks"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      console.log({ token, getState: getState() });
      return headers;
    },
  }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => {
        return {
          url: `auth/register`,
          body: body,
          method: "POST",
        };
      },
    }),
    login: build.mutation({
      query: ({ email, password }) => {
        return {
          url: `auth/login`,
          body: { email, password },
          method: "POST",
        };
      },
    }),
    getAuthUser: build.query({
      query: () => "/auth-user",
    }),
    createTask: build.mutation({
      query: ({ title, description, status, priority, assignedTo }) => {
        return {
          url: `/tasks`,
          body: {
            title,
            description,
            status,
            priority,
            assignedTo,
          },
          method: "POST",
        };
      },
    }),
    getAllUser: build.query({
      query: () => "/users",
    }),
    getAllTask: build.query({
      query: () => "/tasks",
    }),
    getMyTasks: build.query({
      query: (params) => ({
        url: "/tasks/my-tasks",
        params,
      }),
      providesTags: ["my-tasks"],
    }),
    updateMyStatusTask: build.mutation({
      query: ({ taskId, status }) => {
        return {
          url: `/tasks/my-tasks/status`,
          body: {
            taskId,
            status,
          },
          method: "PATCH",
        };
      },
      invalidatesTags: ["my-tasks"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAuthUserQuery,
  useCreateTaskMutation,
  useUpdateMyStatusTaskMutation,
  useGetAllUserQuery,
  useGetAllTaskQuery,
  useGetMyTasksQuery,
} = rootApi;
