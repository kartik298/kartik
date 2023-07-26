import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = { key: string | null };

export const KeySlice = createSlice({
  name: "key",
  initialState: { key: null } as AuthState,
  reducers: {
    setkey: (
      state: any,
      { payload: { key } }: PayloadAction<{ key: string | null }>
    ) => {
      state.key = key;
    },
  },
});

export const { setkey } = KeySlice.actions;
export const keyToken = (state: any) => state.key;

export default KeySlice.reducer;
