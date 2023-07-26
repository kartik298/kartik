import { bindActionCreators, createSlice } from "@reduxjs/toolkit";

const initialState = {
  solver: [
    {
      coordinateSystem: "2D",
      type: "steady",
      algorithm: "classical",
    },
  ],
  equation: [],
  materialProperty: [],
  boundaryCondition: {
    neumannBC: [],
    dirichletBC: [],
    initialBC: [],
  },
  loads: {
    distributedForce: [],
    pointForce: [],
  },
  optimizationConfig: [
    {
      minimize: "compliance",
      volumeFraction: 0,
      maxIteration: 50,
      filterRadius: 1.5,
      fB: 0.3,
      // TODO:
      // ocType: "minimize",
    },
  ],
};

export const solverInputSlice = createSlice({
  name: "solverInput",
  initialState: initialState,
  reducers: {
    resetSolverInputState: () => initialState,
    updateSolver: (state, action) => {
      const {
        coordinateSystem,
        type,
        algorithm,
        startTime,
        endTime,
        timeStep,
        stoppingCriteria,
        massMatrixType,
      } = action.payload;

      state.solver[0] = {
        coordinateSystem,
        type,
        algorithm,
        startTime,
        endTime,
        timeStep,
        stoppingCriteria,
        massMatrixType,
      };
    },
    addEquation: (state) => {
      state.equation = [
        ...state.equation,
        {
          accordion: true,
          name: "",
          type: "heatTransfer",
          meshFile: "sample.msh",
          meshField: "",
          materialPropertyName: "",
          feShape: "",
          gaussPoints: 0,
        },
      ];
    },
    updateEquation: (state, action) => {
      const {
        name,
        type,
        meshField,
        materialPropertyName,
        feShape,
        gaussPoints,
      } = action.payload.values;
      const index = action.payload.index;
      // const index = action.payload.index;

      state.equation[index] = {
        accordion: false,
        name,
        type,
        meshFile: "sample.msh",
        meshField,
        materialPropertyName,
        feShape,
        gaussPoints,
      };
    },
    updateEquationAccordion: (state, action) => {
      const { index } = action.payload;
      state.equation[index].accordion = !state.equation[index].accordion;
    },
    deleteEquation: (state, action) => {
      const { name } = action.payload.values;
      state.equation = state.equation.filter(
        (element) => element.name !== name
      );
    },
    addMaterialProperty: (state) => {
      state.materialProperty = [
        ...state.materialProperty,
        {
          accordion: true,
          name: "",
          type: "LinearElastic",
          youngsMod: 0,
          nu: 0,
          specificHeat: 0,
          rho: 0,
          thickness: 0,
          thermalConductivity: 0,
          density: 0,
        },
      ];
    },
    updateMaterialProperty: (state, action) => {
      const {
        name,
        type,
        youngsMod,
        specificHeat,
        nu,
        rho,
        thickness,
        thermalConductivity,
        density,
      } = action.payload.values;
      const index = action.payload.index;
      state.materialProperty[index] = {
        // accordion: false,
        name: name,
        type: type,
        youngsMod: youngsMod,
        specificHeat: specificHeat,
        nu: nu,
        rho: rho,
        thickness: thickness,
        thermalConductivity: thermalConductivity,
        density: density,
      };
    },

    updateMaterialPropertyAccordion: (state, action) => {
      const { index } = action.payload;
      state.materialProperty[index].accordion =
        !state.materialProperty[index].accordion;
    },

    deleteMaterialProperty: (state, action) => {
      const { index } = action.payload;

      state.materialProperty = state.materialProperty.filter(
        (element, idx) => idx !== index
      );
    },
    updateConditions: (state, action) => {
      const { constraintType, values } = action.payload;

      const {
        name,
        type,
        boundaryType,
        variable,
        selected,
        meshField,
        value,
        value1,
        value2,
        value3,
        xEnabled,
        yEnabled,
        zEnabled,
        convectionCoeff,
        ambientTemp,
        Q,
      } = values;

      switch (type) {
        case "force":
          state.boundaryCondition.neumannBC.push = [
            {
              name,
              type,
              boundaryType,
              variable,
              selected,
              meshField,
              value,
              value1,
              value2,
              value3,
              xEnabled,
              yEnabled,
              zEnabled,
              convectionCoeff,
              ambientTemp,
              Q,
              meshFile: "sample.msh",
              filename: "sample",
            },
          ];
          break;
        case "temperature":
          state.boundaryCondition.dirichletBC.push = [
            {
              name,
              type,
              boundaryType,
              variable,
              selected,
              meshField,
              value,
              value1,
              value2,
              value3,
              xEnabled,
              yEnabled,
              zEnabled,
              convectionCoeff,
              ambientTemp,
              Q,
              meshFile: "sample.msh",
              filename: "sample",
            },
          ];
          break;
        case "displacement":
          state.boundaryCondition.dirichletBC.push = [
            {
              name,
              type,
              boundaryType,
              variable,
              selected,
              meshField,
              value,
              value1,
              value2,
              value3,
              xEnabled,
              yEnabled,
              zEnabled,
              convectionCoeff,
              ambientTemp,
              Q,
              meshFile: "sample.msh",
              filename: "sample",
            },
          ];
          break;
        default:
          state.boundaryCondition.neumannBC.push = [
            {
              name,
              type,
              boundaryType,
              variable,
              selected,
              meshField,
              value,
              value1,
              value2,
              value3,
              xEnabled,
              yEnabled,
              zEnabled,
              convectionCoeff,
              ambientTemp,
              Q,
              meshFile: "sample.msh",
              filename: "sample",
            },
          ];
      }
    },
    resetInitialCondition: (state) => {
      state.boundaryCondition.initialBC = [];
    },
    addInitialCondition: (state) => {
      state.boundaryCondition.initialBC = [
        ...state.boundaryCondition.initialBC,
        {
          accordion: true,
          name: "",
          type: "",
          variable: "",
          selected: "",
          meshFile: "sample.msh",
          meshField: "",
          value: 0,
          value1: 0,
          value2: 0,
          value3: 0,
          xEnabled: false,
          yEnabled: false,
          zEnabled: false,
          filename: "sample",
        },
      ];
    },

    updateInitialCondition: (state, action) => {
      const {
        name,
        type,
        variable,
        selected,
        meshFile,
        meshField,
        value,
        value1,
        value2,
        value3,
        xEnabled,
        yEnabled,
        zEnabled,
        filename,
      } = action.payload.values;

      const index = action.payload.index;
      state.boundaryCondition.initialBC[index] = {
        accordion: false,
        name: name,
        type: type,
        variable: variable,
        selected: selected,
        meshFile: meshFile,
        meshField: meshField,
        value: value,
        value1: value1,
        value2: value2,
        value3: value3,
        xEnabled: xEnabled,
        yEnabled: yEnabled,
        zEnabled: zEnabled,
        filename: filename,
      };
    },

    updateInitialConditionAccordion: (state, action) => {
      const { index } = action.payload;
      state.boundaryCondition.initialBC[index].accordion =
        !state.boundaryCondition.initialBC[index].accordion;
    },
    deleteInitialCondition: (state, action) => {
      const { name } = action.payload.values;
      state.boundaryCondition.initialBC =
        state.boundaryCondition.initialBC.filter(
          (element) => element.name !== name
        );
    },

    addNeumann: (state) => {
      state.boundaryCondition.neumannBC = [
        ...state.boundaryCondition.neumannBC,
        {
          accordion: true,
          name: "",
          type: "",
          variable: "",
          selected: "",
          boundaryType: "normalToBoundary",
          meshFile: "sample.msh",
          meshField: "",
          Q: 0,
          domainSource: false,
          convectionCoeff: 0,
          ambientTemp: 0,
          value: 0,
          value1: 0,
          value2: 0,
          value3: 0,
          xEnabled: false,
          yEnabled: false,
          zEnabled: false,
          filename: "sample",
        },
      ];
    },
    updateNeumann: (state, action) => {
      console.log("inside update neumann", action.payload);
      const {
        name,
        type,
        variable,
        selected,
        boundaryType,
        meshFile,
        meshField,
        Q,
        domainSource,
        convectionCoeff,
        ambientTemp,
        value,
        value1,
        value2,
        value3,
        xEnabled,
        yEnabled,
        zEnabled,
        filename,
      } = action.payload.values;

      const idx =
        action.payload.currentNeumannCount >= 0
          ? action.payload.currentNeumannCount
          : action.payload.index;
      // console.log("tp2", idx);
      state.boundaryCondition.neumannBC[idx] = {
        accordion: false,
        name: name,
        type: type,
        variable: variable,
        selected: selected,
        boundaryType: boundaryType,
        meshFile: meshFile,
        meshField: meshField,
        Q: Q,
        domainSource: domainSource,
        convectionCoeff: convectionCoeff,
        ambientTemp: ambientTemp,
        value: value,
        value1: value1,
        value2: value2,
        value3: value3,
        xEnabled: xEnabled,
        yEnabled: yEnabled,
        zEnabled: zEnabled,
        filename: filename,
      };
    },
    updateNeumannAccordion: (state, action) => {
      const { index } = action.payload;
      state.boundaryCondition.neumannBC[index].accordion =
        !state.boundaryCondition.neumannBC[index].accordion;
    },

    deleteNeumann: (state, action) => {
      const { name } = action.payload.values;

      state.boundaryCondition.neumannBC =
        state.boundaryCondition.neumannBC.filter(
          (element) => element.name !== name
        );
    },
    addDirichlet: (state) => {
      state.boundaryCondition.dirichletBC = [
        ...state.boundaryCondition.dirichletBC,
        {
          accordion: true,
          name: "",
          type: "",
          variable: "",
          selected: "",
          boundaryType: "normalToBoundary",
          meshFile: "sample.msh",
          meshField: "",
          Q: 0,
          domainSource: false,
          convectionCoeff: 0,
          ambientTemp: 0,
          value: 0,
          value1: 0,
          value2: 0,
          value3: 0,
          xEnabled: false,
          yEnabled: false,
          zEnabled: false,
          filename: "sample",
        },
      ];
    },
    updateDirichlet: (state, action) => {
      const {
        name,
        type,
        variable,
        selected,
        boundaryType,
        meshFile,
        meshField,
        Q,
        domainSource,
        convectionCoeff,
        ambientTemp,
        value,
        value1,
        value2,
        value3,
        xEnabled,
        yEnabled,
        zEnabled,
        filename,
      } = action.payload.values;

      const idx =
        action.payload.currentDirichletCount >= 0
          ? action.payload.currentDirichletCount
          : action.payload.index;

      console.log(idx);
      state.boundaryCondition.dirichletBC[idx] = {
        accordion: false,
        name: name,
        type: type,
        variable: variable,
        selected: selected,
        boundaryType: boundaryType,
        meshFile: meshFile,
        meshField: meshField,
        Q: Q,
        domainSource: domainSource,
        convectionCoeff: convectionCoeff,
        ambientTemp: ambientTemp,
        value: value,
        value1: value1,
        value2: value2,
        value3: value3,
        xEnabled: xEnabled,
        yEnabled: yEnabled,
        zEnabled: zEnabled,
        filename: filename,
      };
    },
    updateDirichletAccordion: (state, action) => {
      const { index } = action.payload;
      state.boundaryCondition.dirichletBC[index].accordion =
        !state.boundaryCondition.dirichletBC[index].accordion;
    },

    deleteDirichlet: (state, action) => {
      const { name } = action.payload.values;

      state.boundaryCondition.dirichletBC =
        state.boundaryCondition.dirichletBC.filter(
          (element) => element.name !== name
        );
    },

    updateLoads: (state, action) => {},
    addDistributedForce: (state, action) => {
      state.loads.distributedForce = [
        ...state.loads.distributedForce,
        {
          accordion: true,
          name: "Temp DF name",
          type: "",
          meshField: "",
          boundary: "",
          values: "",
          value1: "",
          value2: "",
          value3: "",
          xEnabled: false,
          yEnabled: false,
          zEnabled: false,
        },
      ];
    },
    updateDistributedForce: (state, action) => {
      const {
        name,
        type,
        meshField,
        boundary,
        values,
        value1,
        value2,
        value3,
        xEnabled,
        yEnabled,
        zEnabled,
      } = action.payload.values;

      const index = action.payload.index;
      state.loads.distributedForce[index] = {
        accordion: false,
        name,
        type,
        meshField,
        boundary,
        values,
        value1,
        value2,
        value3,
        xEnabled,
        yEnabled,
        zEnabled,
      };
    },
    deleteDistributedForce: (state, action) => {
      const { name } = action.payload.values;

      state.loads.distributedForce = state.loads.distributedForce.filter(
        (element) => element.name !== name
      );
    },
    addPointForce: (state) => {
      state.loads.pointForce = [
        ...state.loads.pointForce,
        {
          accordion: false,
          name: "Temp PF name",
          type: "",
          meshField: "",
          boundary: "",
          values: "",
        },
      ];
    },
    updatePointForce: (state, action) => {
      const { name, type, meshField, boundary, values } = action.payload.values;
      const index = action.payload.index;

      state.loads.pointForce[index] = {
        accordion: false,
        name,
        type,
        meshField,
        boundary,
        values,
      };
    },
    deletePointForce: (state, action) => {
      const { name } = action.payload.values;
      state.loads.pointForce = state.loads.pointForce.filter(
        (element) => element.name !== name
      );
    },
    updateDistributedForceAccordion: (state, action) => {
      const { index } = action.payload;
      state.loads.distributedForce[index].accordion =
        !state.loads.distributedForce[index].accordion;
    },
    updatePointForceAccordion: (state, action) => {
      const { index } = action.payload;
      state.loads.pointForce[index].accordion =
        !state.loads.pointForce[index].accordion;
    },
    updateOptimizationConfig: (state, action) => {
      const { minimize, volumeFraction, maxIteration, filterRadius, fB } =
        action.payload;
      state.optimizationConfig[0] = {
        minimize: minimize,
        volumeFraction: volumeFraction,
        maxIteration: maxIteration,
        filterRadius: filterRadius,
        fB: fB,
      };
    },
  },
});

export const {
  resetSolverInputState,
  updateSolver,
  addEquation,
  updateEquation,
  updateEquationAccordion,
  deleteEquation,
  addMaterialProperty,
  deleteMaterialProperty,
  updateMaterialProperty,
  updateMaterialPropertyAccordion,
  updateConditions,
  addInitialCondition,
  updateInitialCondition,
  updateInitialConditionAccordion,
  deleteInitialCondition,
  addNeumann,
  updateNeumann,
  updateNeumannAccordion,
  deleteNeumann,
  addDirichlet,
  updateDirichlet,
  updateDirichletAccordion,
  deleteDirichlet,
  updateLoads,
  addDistributedForce,
  updateDistributedForce,
  deleteDistributedForce,
  addPointForce,
  updatePointForce,
  deletePointForce,
  updateDistributedForceAccordion,
  updatePointForceAccordion,
  updateOptimizationConfig,
  resetInitialCondition,
} = solverInputSlice.actions;
export const solverInputState = (state) => state.solverInput;
export const solverState = (state) => state.solverInput.solver;
export const equationsState = (state) => state.solverInput.equation;
export const optimizationConfig = (state) =>
  state.solverInput.optimizationConfig;
export const materialPropertyState = (state) =>
  state.solverInput.materialProperty;
export const boundaryConditionState = (state) =>
  state.solverInput.boundaryCondition;
export const neumannBC = (state) =>
  state.solverInput.boundaryCondition.neumannBC;
export const initialBC = (state) =>
  state.solverInput.boundaryCondition.initialBC;
export const dirichletBC = (state) =>
  state.solverInput.boundaryCondition.dirichletBC;
export const distributedForce = (state) =>
  state.solverInput.loads.distributedForce;
export const pointForce = (state) => state.solverInput.loads.pointForce;
export const solverInputReducer = solverInputSlice.reducer;
