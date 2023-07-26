import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../routes/BaseUrl";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserResponse {
  jwt: string | null;
}

export interface SignUpResponse {}

export interface LoginRequest {
  email: string;
  password: string;
  otp: number;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}
export interface RecoveryRequest {
  email: string;
}
export interface ConfirmRequest {
  password: string;
  token: string;
}

export interface AuthUserResponse {
  email: string;
  mfa_hash: string;
  name: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }),
  endpoints: (build) => ({
    login: build.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: build.mutation<SignUpResponse, SignupRequest>({
      query: (credentials) => ({
        url: "signup",
        method: "POST",
        body: credentials,
      }),
    }),
    user: build.query<AuthUserResponse, void>({
      query: () => ({
        url: "user",
        method: "GET",
      }),
    }),

    authenticate: build.query<UserResponse, void>({
      query: () => ({
        url: "authenticate",
        method: "GET",
      }),
    }),
    RecoveryPasssword: build.mutation<RecoveryRequest, void>({
      query: (credentials) => ({
        url: "reset-password",
        method: "POST",
        body: credentials,
      }),
    }),
    ConfirmPassword: build.mutation<ConfirmRequest, void>({
      query: (credentials) => ({
        url: "confirm",
        method: "POST",
        body: credentials,
      }),
    }),
    RecoveryMfa: build.mutation<RecoveryRequest, void>({
      query: (credentials) => ({
        url: "mfa-recovery",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: build.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useUserQuery,
  useAuthenticateQuery,
  useLogoutMutation,
  useRecoveryPassswordMutation,
  useConfirmPasswordMutation,
  useRecoveryMfaMutation,
} = authApi;
