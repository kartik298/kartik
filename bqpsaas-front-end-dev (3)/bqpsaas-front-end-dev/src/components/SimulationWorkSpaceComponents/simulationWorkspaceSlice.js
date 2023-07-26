import { createSlice } from "@reduxjs/toolkit";
import { SimulationWorkSpaceContext } from "../../context/SimulationWorkSpaceContext";

export const simulationWorkspaceSlice = createSlice({
  name: "simulationWorkspace",
  initialState: {
    simulationWorkSpace: [...SimulationWorkSpaceContext],
    modal: { switch: false, componentID: null, url: null },
    simulationType: null,
    projectName: "someprojectname",
    fileUploadModal: { switch: false },
    optimizationModal: { switch: false },
  },
  reducers: {
    setSimulationType: (state, action) => {
      const { inputSimulationType } = action.payload;
      state.simulationType = inputSimulationType;
    },
    modalOn: (state, action) => {
      const { id, route } = action.payload;
      const index = state.simulationWorkSpace.findIndex(
        (element) => element.route === route
      );

      state.simulationWorkSpace[index].sideBar = state.simulationWorkSpace[
        index
      ].sideBar.map((element) =>
        element.id === id
          ? { ...element, dropdown: true }
          : { ...element, dropdown: false }
      );

      state.modal.switch = true;
      state.modal.componentID = id;
      state.modal.url = route;
    },
    modalOff: (state, action) => {
      const index = state.simulationWorkSpace.findIndex(
        (element) => element.route === state.modal.url
      );

      if (index >= 0) {
        state.simulationWorkSpace[index].sideBar = state.simulationWorkSpace[
          index
        ].sideBar.map((element) => ({ ...element, dropdown: false }));

        state.modal.switch = false;
        state.modal.componentID = null;
        state.modal.url = null;
      }
    },
    toggleFileUploadModal: (state) => {
      state.fileUploadModal.switch = !state.fileUploadModal.switch;
    },
    toggleOptimizationModal: (state) => {
      state.optimizationModal.switch = !state.optimizationModal.switch;
    },
    setProjectName: (state, action) => {
      const { id } = action.payload;
      state.projectName = id;
    },
  },
});

export const {
  setSimulationType,
  modalOn,
  modalOff,
  setProjectName,
  toggleFileUploadModal,
  toggleOptimizationModal,
  enabledOptimization,
} = simulationWorkspaceSlice.actions;

export const simulationWorkspaceState = (state) =>
  state.simulationWorkspace.simulationWorkSpace;

export const modalState = (state) => state.simulationWorkspace.modal;

export const fileUploadModalState = (state) =>
  state.simulationWorkspace.fileUploadModal.switch;

export const optimizationModalState = (state) =>
  state.simulationWorkSpace.optimizationModal;

export const simulationType = (state) =>
  state.simulationWorkspace.simulationType; //------------

export const projectName = (state) => state.simulationWorkspace.projectName;

export const optimizationEnabled = (state) =>
  state.simulationWorkspace.optimizationEnabled;

export default simulationWorkspaceSlice.reducer;
