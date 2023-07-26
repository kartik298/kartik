import { ModalComponent } from "./Modal/ModalComponent";
import { SimulationSideBar } from "./SimulationSideBar";
import { FileUploadModal } from "./Modal/FileUploadModal";
import { useSelector } from "react-redux";
import { Renderer } from "../../renderer/Renderer";
import { modalState } from "./simulationWorkspaceSlice";
/**  Simulation Workspace component will dynamically 
render subroutes in the parent SimulationWorkSpaceWidget*/

export function SimulationWorkSpaceComponent({ url, sideBarElements, image }) {
  const modalCurrentState = useSelector(modalState);

  const fileUploadModalState = useSelector(
    (state) => state.simulationWorkspace.fileUploadModal.switch
  );

  return (
    <>
      <div className="min-w-2/12 w-min-fit h-full bg-gray-200 overflow-y-auto md:overflow-y-visible">
        <SimulationSideBar url={url} sideBarElements={sideBarElements} />
      </div>
      <div className={modalCurrentState.switch ? "w-3/12 h-full" : "h-full"}>
        <ModalComponent />
      </div>
      <div
        className={modalCurrentState.switch ? "w-9/12 h-full" : "w-full h-full"}
      >
        <Renderer />
      </div>

      {fileUploadModalState && <FileUploadModal />}
    </>
  );
}
