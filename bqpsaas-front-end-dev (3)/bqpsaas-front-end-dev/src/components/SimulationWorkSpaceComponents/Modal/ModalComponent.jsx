import { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { SideBarMenuComponent } from "../SidebarComponents/SideBarMenuComponent";
import { modalOff, modalState } from "../simulationWorkspaceSlice";

/**
 * Modal to show sidebar menu options
 * @returns
 */

export function ModalComponent() {
  const modalCurrentState = useSelector(modalState);
  const dispatch = useDispatch();

  const closeHandler = (event) => {
    event.preventDefault();
    dispatch(modalOff());
  };

  const modalRef = useRef();
  // useOnClickOutside(modalRef, closeHandler);

  return (
    <>
      {modalCurrentState.switch ? (
        <div
          className="ml-1 border-l-2 border-black py-3 w-full h-full bg-gray-200 flex flex-col gap-2"
          ref={modalRef}
        >
          <div className="flex justify-end gap-2 px-3">
            <button
              className="text-black border-2 rounded-md p-1 border-black text-base font-extrabold"
              onClick={closeHandler}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="h-auto md:overflow-visible overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex flex-col gap-2 px-3 text-xl">
            <SideBarMenuComponent
              componentID={modalCurrentState.componentID}
              url={modalCurrentState.url}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
