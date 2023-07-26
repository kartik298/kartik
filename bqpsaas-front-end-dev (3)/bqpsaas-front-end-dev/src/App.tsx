import "./styles/output.css";
import { OnBoardingWidget } from "./routes/OnBoarding/OnBoardingWidget";
import { LoginSignupWidget } from "./routes/LoginSignupPage/LoginSignupWidget";
import { MyProjectsWidget } from "./routes/Dashboard/DashBoardSubRoutes/MyProjects/MyProjectsWidget";
import { ResultsWidget } from "./routes/Dashboard/DashBoardSubRoutes/Results/ResultsWidget";
import { SimulationWidget } from "./routes/Dashboard/DashBoardSubRoutes/Simulations/SimulationWidget";
import { PricingWidget } from "./routes/Pricing/PricingWidget";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardWidget from "./routes/Dashboard/DashboardWidget";
import { SimulationWorkSpaceWidget } from "./routes/SimulationWorkspace/SimulationWorkSpaceWidget";
import { useDispatch, useSelector } from "react-redux";
import { simulationWorkspaceState } from "./components/SimulationWorkSpaceComponents/simulationWorkspaceSlice";
import { SimulationWorkSpaceComponent } from "./components/SimulationWorkSpaceComponents/SimulationWorkSpaceComponent";
import { PrivateRoute } from "./helper/PrivateRoute";
import { setCredentials } from "./services/auth/authSlice";
import { setkey } from "./services/auth/keySlice";
import { useLocalAuth } from "./hooks/useLocalAuth";
import { Toaster } from "react-hot-toast";
import Landing from "./routes/LandingPage/Landing";
import Logout from "./routes/Logout/Logout";

function App() 
{

  const simulationWorkspaceList = useSelector(simulationWorkspaceState);
  const dispatch = useDispatch();
  const { getAuthTokenWithExpiry, getKeyWithExpiry } = useLocalAuth();

  const token = getAuthTokenWithExpiry("tokenBQP");
  if (token) {
    dispatch(setCredentials(token));
  }

  const key = getKeyWithExpiry("KeyBQP");
  if (key) {
    dispatch(setkey(key));
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginSignupWidget type="login" />} />
        <Route path="/signup" element={<LoginSignupWidget type="signup" />} />
        <Route
          path="/reset-password"
          element={<LoginSignupWidget type="reset-password" />}
        />
        <Route
          path="/confirm"
          element={<LoginSignupWidget type="confirm-password" />}
        />
        <Route
          path="/mfa-recovery"
          element={<LoginSignupWidget type="mfa-recovery" />}
        />
 
   
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/onboarding" element={<OnBoardingWidget />} />
          <Route path="/pricing" element={<PricingWidget />} />
          <Route path="/dashboard" element={<DashboardWidget />}>
            <Route path="myproject" element={<MyProjectsWidget />} />
            <Route path="simulations" element={<SimulationWidget />} />
            <Route path="results" element={<ResultsWidget />} />
          </Route>

          <Route
            path="/simulation-workspace"
            element={<SimulationWorkSpaceWidget />}>
            {simulationWorkspaceList
              ? simulationWorkspaceList.map((SimulationRoute: any) => (
                  <Route
                    key={SimulationRoute.route}
                    path={SimulationRoute.route}
                    element={
                      <SimulationWorkSpaceComponent
                        url={SimulationRoute.route}
                        sideBarElements={SimulationRoute.sideBar}
                        image={SimulationRoute.image}
                      />
                    }
                  />
                ))
              : null}
          </Route>
        </Route>
        <Route path="/logout" element={<Logout/>} />
       
      </Routes>
      <Toaster />
      
    </>
  );
}

export default App;



