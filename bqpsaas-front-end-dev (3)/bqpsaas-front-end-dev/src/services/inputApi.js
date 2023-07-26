import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../routes/BaseUrl";

export const inputApi = createApi({
  reducerPath: "inputApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }),
  tagTypes: ["Posts"],
  endpoints: (build) => ({
    selectSimulation: build.mutation({
      query: (body) => ({
        url: "selectsimulations",
        method: "POST",
        body,
      }),
    }),
    solverInput: build.mutation({
      query: (body) => ({
        url: "solverinput",
        method: "POST",
        body,
      }),
    }),
    boundaryInput: build.mutation({
      query: (body) => ({
        url: "boundryinput",
        method: "POST",
        body,
      }),
    }),
    // file upload
    fileUpload: build.mutation({
      query: (body) => ({
        url: "file",
        method: "POST",
        body,
      }),
    }),
    // file download
    fileDownload: build.query({
      query: (body) => ({
        url: "downloadfile",
        method: "GET",
        body,
      }),
    }),

    mbdInput: build.mutation({
      query: (body) => ({
        url: "mbdinput",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSelectSimulationMutation,
  useSolverInputMutation,
  useBoundaryInputMutation,
  useFileUploadMutation,
  useFileDownloadQuery,
  useMbdInputMutation,
} = inputApi;
