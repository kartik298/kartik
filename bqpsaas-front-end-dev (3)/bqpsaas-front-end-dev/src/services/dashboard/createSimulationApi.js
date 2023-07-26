import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../routes/BaseUrl";

export const createSimulationApi = createApi({
  reducerPath: "createSimulationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }),
  tagTypes: ["Posts"],
  endpoints: (build) => ({
    createProject: build.mutation({
      query: (body) => ({
        url: "jobid",
        method: "POST",
        body,
      }),
    }),
    createNeumannBC: build.mutation({
      query: (body) => ({
        url: "neumannbc",
        method: "POST",
        body,
      }),
    }),
    createInitialBC: build.mutation({
      query: (body) => ({
        url: "initialbc",
        method: "POST",
        body,
      }),
    }),
    createDirichletBC: build.mutation({
      query: (body) => ({
        url: "drichletbc",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useCreateNeumannBCMutation,
  useCreateInitialBCMutation,
  useCreateDirichletBCMutation,
} = createSimulationApi;
