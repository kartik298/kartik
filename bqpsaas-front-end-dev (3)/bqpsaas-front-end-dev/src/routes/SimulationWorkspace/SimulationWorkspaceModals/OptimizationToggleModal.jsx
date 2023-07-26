import { useDispatch, useSelector } from "react-redux";
import { CheckInput } from "../../../components/FormComponents/CheckInput";
import {
  optimizationModalState,
  toggleOptimizationModal,
  enabledOptimization,
} from "../../../components/SimulationWorkSpaceComponents/simulationWorkspaceSlice";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import Cookies from "js-cookie";
import { Form, Formik } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { useRef } from "react";
const OptimizationToggleModal = () => {
  const dispatch = useDispatch();
  const closeHandler = () => dispatch(toggleOptimizationModal());

  const outsideRef = useRef(null);
  useOnClickOutside(outsideRef, closeHandler);
  const optmizationModalHandler = (values) => {
    Cookies.set("optimization-enabled", values.optimizationEnabled);
    closeHandler();
  };
  return (
    <div>
      <div className="absolute w-full h-full flex justify-center items-center">
        <div className="absolute w-full h-full bg-gray-200 opacity-40"></div>
        <div
          className="absolute w-5/12 bg-gray-300 rounded-md p-5 flex flex-col gap-2"
          ref={outsideRef}
        >
          <div className="flex items-center pb-3">
            <span className="text-bold text-2xl">Optimization</span>
            <span
              className="text-black text-2xl font-bold ml-auto cursor-pointer"
              onClick={closeHandler}
            >
              <AiOutlineClose />
            </span>
          </div>
          <div>
            <Formik
              initialValues={{
                optimizationEnabled: false,
              }}
              onSubmit={(values) => {
                optmizationModalHandler(values);
              }}
            >
            {({ values }) => (
                  <Form>
                    <div className="bg-white rounded shadow-sm p-4 align-middle">
                      <div className="flex justify-around">
                        <div>
                          <CheckInput
                            label={"Do you want to enable design optimization?"}
                            name="optimizationEnabled"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center	mt-6">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-10 w-fit text-center pt-2"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
            )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationToggleModal;
