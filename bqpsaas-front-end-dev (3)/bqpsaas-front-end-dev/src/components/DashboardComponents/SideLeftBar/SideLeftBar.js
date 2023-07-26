import { useState } from "react";
import { FeatureMenuWidget } from "./FeatureMenu/FeatureMenuWidget";
import { SideBottomBar } from "./SideBottomBar/SideBottomBar";
import { SupportMenuWidget } from "./SupportMenu/SupportMenuWidget";
import { useCreateSimulation } from "./useCreateSimulation";
import TermsConditionModal from "../../../routes/TermsConditionModal";

const SideLeftBar = () => {
  const { createNewSimulationHandler, styles } = useCreateSimulation();
  const [screen, setScreen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const showMo = () => {
    setShowModal(true);
    // setAgree(!agree);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="relative min-h-screen md:flex">
        <div
          className="bg-black text-gray-100 flex justify-between md:hidden h-screen "
          onClick={createNewSimulationHandler}>
          <button className="mobile-menu-button p-4 focus:outline-none focus:bg-black">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div
          className={`bg-${styles.backgroundColor}-300 lg:w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:w-52 md:translate-x-0 transition duration-200 ease-in-out`}>
          <nav>
            <button
              className={`text-${styles.textColor} text-md bg-iris-blue-500 hover:bg-iris-blue-800 text-white rounded font-bold hover:text-black h-12 lg:w-60 md:w-48 text-center`}
              onClick={createNewSimulationHandler}>
              <span className="fa fa-plus text-sm m-1"></span> Create New
            </button>
            {/* <div className="flex flex-col justify-between h-5/6 py-2">
              <FeatureMenuWidget />
              <SupportMenuWidget />{" "}
            </div>
            <div className="mt-auto"></div>
            <SideBottomBar /> */}
            <div className="m-2">
              <div className="bg-yellow-300 text-yellow-900 text-center text-sm px-10 py-2 border-yellow-300 rounded-md lg:absolute lg:left-10 lg:bottom-60 md:absolute md:bottom-60 sm:relative">
                <i className="fa fa-info-circle mr-2"></i>
                Alpha Version
              </div>
            </div>

            <div className="lg:absolute mb-4 lg:mt-96 lg:bottom-20 md:absolute md:mt-96 md:bottom-20">
              <hr className="h-px my-4 bg-gray-500 border-0 dark:bg-gray-700" />
              <div className={`grid grid-cols-1 gap-4`}>
                <button
                  className={`text-${styles.textColor} text-md bg-iris-blue-500 hover:bg-iris-blue-800 text-white rounded font-bold hover:text-black h-12 lg:w-60 md:w-48 text-center`}>
                  <a href="mailto:BQPhyAlpha@bosonqpsi.com">Contact Support</a>
                </button>
                <button
                  className={`text-${styles.textColor} text-md bg-iris-blue-500 hover:bg-iris-blue-800 text-white rounded font-bold hover:text-black h-12 lg:w-60 md:w-48 text-center`}>
                  <span onClick={showMo}>Terms & Conditions</span>
                </button>
              </div>
            </div>
            {/* <ul className="pt-4 mt-4 space-y-2 border-t border-black dark:border-gray-700"></ul> */}
          </nav>
        </div>
      </div>
      {showModal ? (
        <TermsConditionModal
          customStyle=""
          closeMo={closeModal}
          showMo={showModal}
        />
      ) : null}
    </>
  );
};

export { SideLeftBar };
