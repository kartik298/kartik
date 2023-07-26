import * as Yup from 'yup';
import { Form, Formik, ErrorMessage } from "formik";
import { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { toggleModal } from "../../../routes/Dashboard/DashboardSlice";
import { useCreateProjectMutation } from "../../../services/dashboard/createSimulationApi";
import { LabelText } from "../../FormComponents/LabelText";
import { ValueInput } from "../../FormComponents/ValueInput";
import { SimulationSelectionCard } from "../SimulationSelectionCard";
import {
  setProjectName,
  toggleFileUploadModal,
} from "../../SimulationWorkSpaceComponents/simulationWorkspaceSlice";
import { setSimulationType } from "../../SimulationWorkSpaceComponents/simulationWorkspaceSlice";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";
import { useUserQuery } from "../../../services/auth/authApi";
import { baseUrl } from "../../../routes/BaseUrl";
import { resetSolverInputState } from "../../../features/simulationWorksapce/SolverInputSlice";
import "../../../styles/utilitystyles.css";

export function DashBoardModal() {
  const dispatch = useDispatch();
  const closeHandler = () => dispatch(toggleModal());
  const outsideRef = useRef(null);
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const fileUploadModalHandler = () => dispatch(toggleFileUploadModal());

  useOnClickOutside(outsideRef, closeHandler);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    if (!values.simulationType || !values.projectName) {
      toast.error("Please enter a project name and select a simulation type!");
      return;
    }
    Cookies.set("simulation-type", values.simulationType);
    Cookies.set("projectname", values.projectName);
    try {
      let userDetails = await axios.get(baseUrl + "user", {
        withCredentials: true,
      });
      userDetails = userDetails.data;
      setLoading(true);
      if (userDetails.role === "internal") {
        const userId = userDetails.id;
        const userName = userDetails.name;
        Cookies.set("username", userName);
        const jobData = {
          user: userId,
          simulationType: Cookies.get("simulation-type"),
          projectName: Cookies.get("projectname"),
        };
        try {
          const createJob = await axios.post(baseUrl + "jobid", jobData);
          closeHandler();
          fileUploadModalHandler();
          dispatch(resetSolverInputState());
        } catch (error) {
          toast.error(
            "Unable to create a project, your changes will NOT BE SAVED!"
          );
        }
      } else {
        toast.error(
          "You don't have necessary permissions to create a project. Please contact your admin!"
        );
        return;
      }
    } catch (error) {
      toast.error("Cannot fetch user details [Server User]");
    }
  };

  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <div className="absolute w-full h-full bg-gray-900 opacity-70"></div>
      <div
        className="absolute lg:w-6/12 md:w-5/12 sm:w-6/12 bg-white rounded-md p-10 flex flex-col gap-2"
        ref={outsideRef}
      >
        <div className="flex place-content-center items-center">
          <span className="text-bold font-semibold text-2xl">
            Create Project
          </span>
          <span
            className="text-black text-2xl font-bold ml-auto cursor-pointer rounded hover:border-4 hover:bg-gray-200"
            onClick={closeHandler}
          >
            <AiOutlineClose />
          </span>
        </div>
        <div></div>
        <div className="flex flex-col gap-4">
          <Formik
            initialValues={{
              projectName: "",
              simulationType: "",
            }}
            validationSchema={Yup.object({
              projectName: Yup.string()
                .required('Required')
                .matches(/^[a-zA-Z0-9_-]+$/, 'Only hyphens and underscores allowed, no spaces'),
              simulationType: Yup.string().required('Required'),
            })}
            onSubmit={(values) => submitHandler(values)}
          >
            {({ values }) => (
              <Form className="flex flex-col gap-3">
                <ValueInput
                  label="Project Name"
                  name="projectName"
                  placeholder="Enter a project name"
                />
                <ErrorMessage name="projectName">
                  {msg => <div className="text-red-600">{msg}</div>}
                </ErrorMessage>
                <LabelText name="Simulation Type" />
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-2 gap-4">
                  {/* <div className="flex justify-center">
                  <SimulationSelectionCard
                    url="https://images.unsplash.com/photo-1597332503885-fc8d195a99b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                    caption="Fluid"
                    name="simulationType"
                    value="fluid"
                    selected={values.simulationType === "fluid"}
                    />
                  </div> */}
                  <div className="flex justify-center">
                    <SimulationSelectionCard
                      url="https://images.unsplash.com/photo-1580380599919-b21e77e4259b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      caption="Thermal"
                      name="simulationType"
                      value="thermal"
                      selected={values.simulationType === "thermal"}
                    />
                  </div>
                  {/* <div className="flex justify-center"> */}
                  {/* <SimulationSelectionCard
                    url="https://images.unsplash.com/photo-1610399397054-33f41a9851f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1098&q=80"
                    caption="MBD"
                    name="simulationType"
                    value="mbd"
                    selected={values.simulationType === "mbd"}
                    />
                  </div> */}
                  <div className="flex justify-center">
                    <SimulationSelectionCard
                      url="https://evotechcae.com/wp-content/uploads/2021/03/slider-1-min.jpg"
                      caption="Solid"
                      name="simulationType"
                      value="solid"
                      selected={values.simulationType === "solid"}
                    />
                  </div>
                </div>
                <div className="flex justify-around space-x-4 flex-wrap">
                  <div className="flex justify-center lg:justify-between">
                    <button
                      className="bg-iris-blue-500 m-2 hover:bg-iris-blue-800 text-white rounded font-bold hover:text-black w-52 h-12 lg:h-12 lg:w-52 lg:relative md:relative sm:h-10 text-center sm:text-sm "
                      type="submit"
                      disabled={isLoading}
                    >
                      {loading ? "Creating..." : "Create"}
                    </button>
                  </div>

                  <div className="flex justify-center lg:justify-between" style={{ margin: '0px' }}>
                    <button
                      className="bg-iris-blue-500 m-2 hover:bg-iris-blue-800 text-white rounded font-bold hover:text-black w-52 h-12 lg:h-12 lg:relative sm:h-10 text-center sm:text-sm "
                      onClick={closeHandler}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
