import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { RadioInput } from "../../../FormComponents/RadioInput";
import { solverState } from "../../../../features/simulationWorksapce/SolverInputSlice";
import { updateSolver } from "../../../../features/simulationWorksapce/SolverInputSlice";
import { modalOff } from "../../simulationWorkspaceSlice";
import { AiOutlineCheck } from "react-icons/ai";
import Cookies from "js-cookie";
import { SelectInput } from "../../../FormComponents/SelectInput";
const Methods = ({ id, url }) => {
  const dispatch = useDispatch();
  const solverCurrentState = useSelector(solverState);
  const simulationType = Cookies.get("simulation-type");
  const Algorithm=[
    { option: "classical", display: "Classical" },
  ]
  return (
    <div className="flex flex-col pl-2">
      <Formik
        initialValues={{
          coordinateSystem: solverCurrentState[0].coordinateSystem,
          type: solverCurrentState[0].type,
          algorithm:solverCurrentState[0].algorithm,
          // startTime: solverCurrentState[0].startTime,
          // endTime: solverCurrentState[0].endtime,
          // timeStep: solverCurrentState[0].timestep,
          // stoppingCriteria: solverCurrentState[0].stoppingCriteria,
          // massMatrixType: solverCurrentState[0].massMatrixType,
        }}
        onSubmit={async (values) => {
          // await new Promise((r) => setTimeout(r, 500));
          // alert(JSON.stringify(values, null, 2));

          const { coordinateSystem, type , algorithm} = values;

          dispatch(
            updateSolver({
              coordinateSystem,
              type,
              algorithm,
            })
          );
          console.log(url, id);
          dispatch(
            modalOff({
              route: url,
              id: id,
            })
          );
        }}
      >
        {({ values }) => (
          <Form>
            <div className="flex flex-col gap-2">
              <>
                <span className="font-medium">Co-ordinate System</span>
                <RadioInput
                  name="coordinateSystem"
                  value="2D"
                  optionName="2D"
                />
                <RadioInput
                  name="coordinateSystem"
                  value="3D"
                  optionName="3D"
                />
              </>
              <>
                <span className="font-medium">Type</span>
                {simulationType === "thermal" ? (
                  <RadioInput
                    name="type"
                    value="steady"
                    optionName="Steady State"
                  />
                ) : simulationType === "solid" ? (
                  <RadioInput
                    name="type"
                    value="steady"
                    optionName="Linear - Static"
                  />
                ) : null}
                {/* <SelectInput
                    label="Algorithm"
                    name="algorithm"
                    selectList={Algorithm}
                  /> */}
              </>
              <div className="flex justify-start gap-2">
                <button
                  className="text-black border-2 border-black rounded-md p-1 bg-green-500 text-md font-medium flex justify-center items-center"
                  type="submit"
                >
                  <AiOutlineCheck />
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Methods;
