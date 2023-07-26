import { createSlice } from "@reduxjs/toolkit";

interface DashboardState {
  modal: boolean;
}

const initialState: DashboardState = { modal: false };

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleModal(state: DashboardState) {
      state.modal = !state.modal;
    },
  },
});

export const { toggleModal } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
