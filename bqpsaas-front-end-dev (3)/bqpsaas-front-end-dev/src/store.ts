import { configureStore } from "@reduxjs/toolkit";
import simulationWorkspaceReducer from "./components/SimulationWorkSpaceComponents/simulationWorkspaceSlice";
import { setupReducer } from "./components/SimulationWorkSpaceComponents/SidebarComponents/Setup/SetupSlice";
import { solverInputReducer } from "./features/simulationWorksapce/SolverInputSlice";
import authReducer from "./services/auth/authSlice";
import { inputApi } from "./services/inputApi";
import { authApi } from "./services/auth/authApi";
import themeReducer from "./features/theme/themeSlice";
import { dashboardReducer } from "./routes/Dashboard/DashboardSlice";
import { modelReducer } from "./renderer/modelSlice";
import { createSimulationApi } from "./services/dashboard/createSimulationApi";

export const store = configureStore({
  reducer: {
    simulationWorkspace: simulationWorkspaceReducer,
    [createSimulationApi.reducerPath]:createSimulationApi.reducer,
    setup: setupReducer,
    solverInput: solverInputReducer,
    auth: authReducer,
    theme: themeReducer,
    dashboard: dashboardReducer,
    model: modelReducer,
    [inputApi.reducerPath]: inputApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(inputApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
