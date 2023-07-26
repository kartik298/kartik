import toast from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import SimulationBar from "../../components/simulationbar_components/SimulationBar";
import { BottomSettingBar } from "../../components/SimulationWorkSpaceComponents/BottomSettingBar/BottomSettingBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../BaseUrl";
import OptimizationToggleModal from "./SimulationWorkspaceModals/OptimizationToggleModal";
import { optimizationModalState } from "../../components/SimulationWorkSpaceComponents/simulationWorkspaceSlice";
import { useSelector } from "react-redux";
import Timer from "../../components/CommonComponents/Timer"
const SimulationWorkSpaceWidget = () => {
  const [role, setRole] = useState("external");
  const navigate = useNavigate();
  const optimizationToggleState = useSelector(
    (state) => state.simulationWorkspace.optimizationModal
  );

  useEffect(() => {
    const validateUserRole = async () => {
      let userDetails = await axios.get(baseUrl + "user", {
        withCredentials: true,
      });
      userDetails = userDetails.data;
      const role = userDetails.role;
      if (role === "external") {
        navigate("/dashboard/myproject");
        toast.error(
          "You don't have the necessary permissions to access this page"
        );
      }
      setRole(role);
    };
    validateUserRole();
  }, []);

  return (
    <div>
      {optimizationToggleState.switch ? <OptimizationToggleModal /> : null}
      {role === "internal" ? (
        <div className="flex flex-col w-screen h-screen">
          <SimulationBar />
          <Timer></Timer>
          <div className="w-full h-full flex overflow-y-auto bg-white">
            {optimizationToggleState.switch ? null : <Outlet />}
          </div>

          {/* <BottomSettingBar /> */}
        </div>
      ) : null}
    </div>
  );
};

export { SimulationWorkSpaceWidget };
