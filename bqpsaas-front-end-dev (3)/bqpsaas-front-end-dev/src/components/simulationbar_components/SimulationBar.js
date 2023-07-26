import bqp_logo from "../../assets/images/bqp_logo.webp";
import NavBarLogo from "./NavBarLogo";
import { SimulationNavItems } from "./SimulationNavItems";
import mesh from "../../assets/images/mesh.png";
import modelling from "../../assets/images/modelling.png";
import result from "../../assets/images/result.png";
import setup from "../../assets/images/setup.png";
import simulation from "../../assets/images/simulation.png";
import { useDispatch, useSelector } from "react-redux";
import {
  optimizationEnabled,
  modalOff,
} from "../SimulationWorkSpaceComponents/simulationWorkspaceSlice";
import { useEffect, useState } from "react";
import { ProfileAvatar } from "../CommonComponents/ProfileAvatar";
import Cookies from "js-cookie";
function SimulationBar() {
  const dispatch = useDispatch();
  // const clickHandler = (route) => {
  //   dispatch(modalOff({ route }));
  // };
  const isOptimizationEnabled = Cookies.get("optimization-enabled");
  const [route, setRoute] = useState("");

  useEffect(() => {
    dispatch(modalOff());
  }, [route, dispatch]);

  return (
    <div className="bg-black border-b-2 h-24">
      <div className="flex items-center justify-between h-full border-gray-300 border-b-2">
        <div className="flex items-center">
          <NavBarLogo
            logo_src={bqp_logo}
            logo_alt="bqp_logo"
            company_name="BQPhy"
          />
        </div>
        <nav className="flex gap-3 ml-auto mr-auto">
          {/* <SimulationNavItems
            icon={modelling}
            icon_alt_text="modelling_icon"
            url="/simulation-workspace/modelling"
            title="Modelling"
            clickHandler={() => setRoute("/simulation-workspace/modelling")}
          />
          <SimulationNavItems
            icon={mesh}
            icon_alt_text="mesh_icon"
            url="/simulation-workspace/mesh"
            title="Mesh"
            clickHandler={() => setRoute("/simulation-workspace/mesh")}
          /> */}

          <SimulationNavItems
            icon={setup}
            icon_alt_text="setup_icon"
            url="/simulation-workspace/setup"
            title="Setup"
            clickHandler={() => setRoute("/simulation-workspace/setup")}
          />
          {isOptimizationEnabled === "true" ? (
            <SimulationNavItems
              icon={mesh}
              icon_alt_text="optimization_icon"
              url="/simulation-workspace/optimization"
              title="Optimization"
              clickHandler={() =>
                setRoute("/simulation-workspace/optimization")
              }
            />
          ) : null}
          <SimulationNavItems
            icon={simulation}
            icon_alt_text="simulation_icon"
            url="/simulation-workspace/simulation"
            title="Simulation"
            clickHandler={() => setRoute("/simulation-workspace/simulation")}
          />
          {/* <SimulationNavItems
            icon={result}
            icon_alt_text="result_icon"
            url="/simulation-workspace/result"
            title="Result"
            clickHandler={() => setRoute("/simulation-workspace/result")}
          /> */}
        </nav>
        <div className="flex items-center">
          {/* <div className="flex items-baseline space-x-4">
            <NavBarLink link_text="Resources" />
            <NavBarLink link_text="Forum" />
            <NavBarLink link_text="Share" />
          </div> */}
          <ProfileAvatar />
        </div>
      </div>
      {/* <div className="flex h-1/2 items-center justify-between px-3 bg-yellow-800"> */}
      {/* Unused navlinks for file, edit, tools, units and help */}
      {/* <div className="flex items-center gap-5">
          <NavBarLink link_text="File" />
          <NavBarLink link_text="Edit" />
          <NavBarLink link_text="Tools" />
          <NavBarLink link_text="Units" />
          <NavBarLink link_text="Help" />
        </div> */}
      {/* <nav className="flex gap-3 ml-auto mr-auto">
          <SimulationNavItems
            icon={modelling}
            icon_alt_text="modelling_icon"
            url="/simulation-workspace/modelling"
            title="Modelling"
            clickHandler={() => setRoute("/simulation-workspace/modelling")}
          />
          <SimulationNavItems
            icon={mesh}
            icon_alt_text="mesh_icon"
            url="/simulation-workspace/mesh"
            title="Mesh"
            clickHandler={() => setRoute("/simulation-workspace/mesh")}
          />
          <SimulationNavItems
            icon={setup}
            icon_alt_text="setup_icon"
            url="/simulation-workspace/setup"
            title="Setup"
            clickHandler={() => setRoute("/simulation-workspace/setup")}
          />
          <SimulationNavItems
            icon={simulation}
            icon_alt_text="simulation_icon"
            url="/simulation-workspace/simulation"
            title="Simulation"
            clickHandler={() => setRoute("/simulation-workspace/simulation")}
          />
          <SimulationNavItems
            icon={result}
            icon_alt_text="result_icon"
            url="/simulation-workspace/result"
            title="Result"
            clickHandler={() => setRoute("/simulation-workspace/result")}
          />
        </nav> */}
      {/* <img src={arrowIcon} alt="arrow-icon" className="h-8" /> */}
      {/* </div> */}
    </div>
  );
}

export default SimulationBar;
