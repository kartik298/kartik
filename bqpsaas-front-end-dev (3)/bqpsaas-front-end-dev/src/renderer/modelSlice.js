import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hoveredID: null,
  selectedID: null,
  color: "",
};

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setHoveredID: (state, action) => {
      state.hoveredID = action.payload.id;
      state.color = "#ed7168";
    },
    setSelectedID: (state, action) => {
      state.selectedID = action.payload.id;
      state.color = "#02f54b";
    },
    resetSelectedID: (state) => {
      state.selectedID = null;
    },
    resetHoveredID: (state) => {
      state.hoveredID = null;
    },
  },
});

export const modelState = (state) => state.model;

export const { setHoveredID, setSelectedID, resetHoveredID, resetSelectedID } =
  modelSlice.actions;

export const modelReducer = modelSlice.reducer;
