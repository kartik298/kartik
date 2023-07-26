import thermoCarImg from "../../assets/sphere/thermoCar.png";
import { Link } from "react-router-dom";
import { modalOn } from "./simulationWorkspaceSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  optimizationConfig,
  solverInputState,
} from "../../features/simulationWorksapce/SolverInputSlice";
import {
  useBoundaryInputMutation,
  useMbdInputMutation,
  useSolverInputMutation,
} from "../../services/inputApi";
import toast from "react-hot-toast";
import { modelState } from "../../renderer/modelSlice";
import { baseUrl } from "../../routes/BaseUrl";
import axios from "axios";
import { useUserQuery } from "../../services/auth/authApi";
import Cookies from "js-cookie";
import { useState } from "react";
import OptimizationConfigs from "./SidebarComponents/Optimization/OptimizationConfigs";

const SimulationSideBar = ({ url, sideBarElements }) => {
  const dispatch = useDispatch();
  const modalHandler = (event) =>
    dispatch(
      modalOn({
        route: url,
        id: String(event.currentTarget.id),
      })
    );
  const solverInputCurrentState = useSelector(solverInputState);
  const [solverInput] = useSolverInputMutation();
  const [boundaryCondition] = useBoundaryInputMutation();
  const [mbdInput] = useMbdInputMutation();
  const optimizationState = useSelector(optimizationConfig);
  const [didSimulationRan, setDidSimulationRan] = useState(false);
  const [loading, setLoading] = useState(false);
  const [runner, setRunner] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const downloadHandler = async (event) => {
    event.preventDefault();
    // fetch(baseUrl + "downloadfile", { credentials: "include" }).then((res) => {
    //   console.log(res.json());
    // }).then((data) => console.log());

    try {
      const generateDownloadUrlRequest = await axios.get(
        baseUrl + "downloadfile",
        {
          withCredentials: true,
        }
      );

      const checkExistenceOfFile = await axios.get(
        generateDownloadUrlRequest.data.download_url
      );

      if (checkExistenceOfFile.status === 200) {
        toast.success("File is ready for download");
        setTimeout(() => {
          window.open(generateDownloadUrlRequest.data.download_url);
        }, 1000);
      } else {
        toast.error("Simulation is still in progress");
        setTimeout(() => {
          toast.info("Please visit dashboard for download");
        }, 2000);
      }
    } catch (error) {
      toast.error("Unable to download");
    }
  };

  let optimizationBool = Cookies.get("optimization-enabled");

  const run = async () => {
    try {
      const url =
        optimizationBool === "true"
          ? `${baseUrl}QGARun`
          : "http://localhost:8081/run";
      //: "http://3.21.211.144:6022/run";
      // :"https://alpha.bosonqpsi.com/core-api/run";

      console.log("Sending request to:", url);

      const response = await axios.get(url, {
        withCredentials: true,
        mode: "include",
      });

      if (response.status === 200) {
        toast.success("Simulation started successfully!");
        setRunner(false);
      } else {
        setRunner(false);
        throw new Error("Unable to run code!");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const runSimulationHandler = async (event) => {
    try {
      await run();
      setDidSimulationRan(true);
    } catch (error) {
      setRunner(false);
      toast.error("Unable to run code!");
    }
  };
  // This function seperate the displacement axix and merge other
  const seperator = (arr, selector) => {
    const temp = [];
    var current;
    arr.map((element) => {
      if (element.selected === selector) {
        if (element.xEnabled) {
          current = JSON.parse(JSON.stringify(element));
          current.value = element.value1;
          current.variable = "dispX";
          temp.push(current);
        }
        if (element.yEnabled) {
          current = JSON.parse(JSON.stringify(element));
          current.value = element.value2;
          current.variable = "dispY";
          temp.push(current);
        }
        if (element.zEnabled) {
          current = JSON.parse(JSON.stringify(element));
          current.value = element.value3;
          current.variable = "dispZ";
          temp.push(current);
        }
      } else {
        temp.push(element);
      }
    });
    return temp;
  };

  const updateHandler = async (event) => {
    event.preventDefault();

    if (!solverInputCurrentState.materialProperty.length) {
      toast.error("Please provide input for solver parameters!");
      setDisableButton(true);
      return;
    } else {
      setDisableButton(false);
    }

    setLoading(true);

    switch (url) {
      case "/simulation-workspace/setup":
        const responseSolverInput = await solverInput({
          solver: solverInputCurrentState.solver,
          equation: solverInputCurrentState.equation,
          materialProperty: solverInputCurrentState.materialProperty,
          optimizationConfig: optimizationState,
        });

        const { data: dataSolverInput, error: errorSolverInput } =
          responseSolverInput;

        if (dataSolverInput) {
          toast.success("Updated Solver Inputs");
        } else if (errorSolverInput) {
          toast.error("Failed to update Solver Inputs");
        }
        let dirichletBC = seperator(
          solverInputCurrentState.boundaryCondition.dirichletBC,
          "displacement"
        );

        const responseBoundaryConditions = await boundaryCondition({
          neumannBC: solverInputCurrentState.boundaryCondition.neumannBC,
          dirichletBC: dirichletBC,
          initialBC: solverInputCurrentState.boundaryCondition.initialBC,
        });

        const { data: dataBoundaryConditions, error: errorBoundaryConditions } =
          responseBoundaryConditions;

        const responseMbdInput = await mbdInput({
          parts: [
            {
              name: "part1",
              format: "gmsh",
              meshFileName: "sample.msh",
            },
          ],
        });

        const { data: dataMbdInput, error: errorMbdInput } = responseMbdInput;

        if (dataMbdInput) {
          setLoading(false);
          toast.success("Updated MBD Input");
        } else if (errorMbdInput) {
          toast.error("Failed to update MBD Input");
        }

        if (dataBoundaryConditions) {
          toast.success("Updated Boundary Conditions");
        } else if (errorBoundaryConditions) {
          toast.error("Failed to updated Boundary Conditions");
        }

        if (true) {
          try {
            const userData = await axios.get(baseUrl + "user", {
              withCredentials: true,
            });
            const userId = userData.data.id;
            const jobData = {
              user: userId,
              simulationType: Cookies.get("simulation-type"),
              projectName: Cookies.get("projectname"),
            };
          } catch (error) {
            toast.error(
              "Unable to create a project, your changes will NOT BE SAVED!"
            );
          }
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="w-full h-full pt-2 px-5 flex flex-col justify-between">
      {url === "/simulation-workspace/setup" ? (
        <div className="overflow-y-auto">
          {sideBarElements
            ? sideBarElements.map((element) => (
                <div key={element.id} className="flex flex-col">
                  <div
                    id={element.id}
                    className={
                      !element.dropdown
                        ? "flex items-center cursor-pointer mb-2 p-2 text-xl rounded-md transition ease-in hover:bg-gray-700 hover:text-white "
                        : "flex items-center cursor-pointer mb-2 bg-gray-800 text-white p-2 text-xl rounded-md"
                    }
                    onClick={modalHandler}
                  >
                    <p>{element.name}</p>
                  </div>
                </div>
              ))
            : null}
        </div>
      ) : null}

      {url === "/simulation-workspace/optimization" ? (
        <OptimizationConfigs />
      ) : null}

      {url === "/simulation-workspace/simulation" ? (
        <div>
          <button
            className={
              disableButton
                ? "mb-3 p-2 text-xl rounded-md w-full bg-gray-500 text-white font-bold cursor-not-allowed"
                : "mb-3 p-2 text-xl rounded-md w-full bg-iris-blue-500 hover:bg-iris-blue-800 text-white font-bold hover:text-black"
            }
            onClick={() => {
              runSimulationHandler();
              setRunner(true);
            }}
            disabled={disableButton}
          >
            {runner ? "Running..." : "Run Simulation"}
          </button>
          {didSimulationRan ? (
            <div>
              <button
                className={
                  !runner
                    ? `mb-3 p-2 text-xl rounded-md w-full bg-iris-blue-500 hover:bg-iris-blue-800 text-white font-bold hover:text-black`
                    : `mb-3 p-2 text-xl rounded-md w-full bg-gray-500 text-white font-bold hover:text-black cursor-not-allowed`
                }
                disabled={runner}
                onClick={downloadHandler}
              >
                File Download
              </button>
            </div>
          ) : null}
          {/* <div className="border-t-2 border-gray-400">
            <span>Estimator</span>
            <img src={thermoCarImg} alt="" />
            <table className="w-full mx-2">
              <tbody>
                <tr>
                  <td>Core Hours</td>
                  <td>Time</td>
                </tr>
                <tr>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Physics</td>
                </tr>
                <tr>
                  <td>Parameter</td>
                </tr>
                <tr>
                  <td>Simulation</td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </div>
      ) : null}
      {url === "/simulation-workspace/setup" ? (
        <div>
          <button
            className="mb-3 p-2 text-xl rounded-md transition w-full bg-iris-blue-500 hover:bg-iris-blue-800 text-white font-bold hover:text-black "
            onClick={updateHandler}
          >
            {loading ? "Uploading..." : "Upload Parameters"}
          </button>
        </div>
      ) : null}
      {/* {url === "/simulation-workspace/result" ? (
        <div>
          <button
            className="bg-green-600 mb-3 p-2 text-white text-xl rounded-md hover:bg-green-700 w-full"
            onClick={downloadHandler}>
            File Download
          </button>
        </div>
      ) : null} */}
    </div>
  );
};

export { SimulationSideBar };
