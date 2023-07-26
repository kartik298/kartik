import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = { jwt: string | null };

export const AuthSlice = createSlice({
  name: "auth",
  initialState: { jwt: null } as AuthState,
  reducers: {
    setCredentials: (
      state: any,
      { payload: { jwt } }: PayloadAction<{ jwt: string | null }>
    ) => {
      state.jwt = jwt;
    },
  },
});

export const { setCredentials } = AuthSlice.actions;
export const authToken = (state: any) => state.auth;

export default AuthSlice.reducer;
