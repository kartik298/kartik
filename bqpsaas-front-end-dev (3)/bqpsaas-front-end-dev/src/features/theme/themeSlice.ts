import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  common: {
    header: {
      backgroundColor: "black",
    },
  },
  dashboard: {
    leftSideBar: {
      backgroundColor: "gray",
      textColor: "white",
      selectionButton: {
        backgroundColor: "blue",
        textColor: "white",
      },
    },
    myProject: {
      dashboardCount: {
        heading: {
          fontSize: "",
          fontColor: "",
        },
      },
    },
  },
  simulationWorkspace: {
    leftSideBar: {
      backgroundColor: "gray",
    },
  },
  auth: {},
};

// route wise styling
export const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {},
});

export default themeSlice.reducer;
