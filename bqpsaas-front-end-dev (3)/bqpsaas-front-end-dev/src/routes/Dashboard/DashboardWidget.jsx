import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { DashBoardModal } from "../../components/DashboardComponents/DashboardModal/DashBoardModal";
import { DashboardNavItem } from "../../components/DashboardComponents/DashboardNavItem";
import { SideLeftBar } from "../../components/DashboardComponents/SideLeftBar/SideLeftBar";
import NavBar from "../../components/NavBar";
import { FileUploadModal } from "../../components/SimulationWorkSpaceComponents/Modal/FileUploadModal";
import Timer from "../../components/CommonComponents/Timer"
const DashboardWidget = () => {
  const { modal } = useSelector((state) => state.dashboard);
  const fileUploadModalState = useSelector(
    (state) => state.simulationWorkspace.fileUploadModal.switch
  );

  return (
    <div className="flex flex-col h-screen w-screen">
      <NavBar />
      <div className="h-screen w-full flex">
        <SideLeftBar />
        <div className="w-screen h-full flex flex-col py-1 gap-2 md:h-4/5">
          {/* <DashboardNavItem /> */}
          <Timer></Timer>
          <Outlet />
        </div>
      </div>
      {modal && <DashBoardModal />}
      {fileUploadModalState && <FileUploadModal />}
    </div>
  );
};

export default DashboardWidget;
