import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    name: "Methods",
    // icon: <FaFill />,
    id: "SESB000",
    dropdown: false,
    dropdownList: [],
  },
  {
    name: "Multiphysics",
    // icon: <FaDiceD20 />,
    id: "SESB001",
    dropdown: true,
    dropdownList: [{ name: "Test" }],
  },
  {
    name: "Material",
    // icon: <FaDna />,
    id: "SESB002",
    dropdown: false,
    dropdownList: [],
  },
  {
    name: "Equations",
    // icon: <FaEquals />,
    id: "SESB003",
    dropdown: false,
    dropdownList: [],
  },
  {
    name: "Boundary Conditions",
    // icon: <FaEgg />,
    id: "SESB004",
    dropdown: false,
    dropdownList: [],
  },
  {
    name: "Constraints",
    // icon: <FaEject />,
    id: "SESB005",
    dropdown: false,
    dropdownList: [],
  },
  {
    name: "Loads/External Source",
    // icon: <FaFillDrip />,
    id: "SESB006",
    dropdown: false,
    dropdownList: [],
  },
];

export const setupSlice = createSlice({
  name: "setup",
  initialState: initialState,
  reducers: {
    dropdownOnOff: (state, action) => {
      const { id } = action.payload;
      const index = state.findIndex((element) => element.id === id);
      state[index].dropdown = !state[index].dropdown;
    },
    multiphysicsHandler: (state) => {},
    materialHandler: (state) => {},
    equationHandler: (state) => {},
  },
});

export const {
  dropdownOnOff,
  multiphysicsHandler,
  materialHandler,
  equationHandler,
} = setupSlice.actions;
export const setupState = (state) => state.setup;
export const setupReducer = setupSlice.reducer;
