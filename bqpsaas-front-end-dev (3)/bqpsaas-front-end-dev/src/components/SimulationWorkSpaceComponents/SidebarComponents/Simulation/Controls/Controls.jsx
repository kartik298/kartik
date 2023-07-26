import { Form, Formik } from "formik";
import { AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  solverState,
  updateSolver,
} from "../../../../../features/simulationWorksapce/SolverInputSlice";
import { ValueInput } from "../../../../FormComponents/ValueInput";
import { modalOff } from "../../../simulationWorkspaceSlice";

export const Controls = ({ id, url }) => {
  const dispatch = useDispatch();
  const solverCurrentState = useSelector(solverState);

  return (
    // need to add stopping criteria, align input boxes
    <div className="flex flex-col pl-2">
      <Formik
        initialValues={{
          startTime: solverCurrentState.startTime,
          endTime: solverCurrentState.endtime,
          timeStep: solverCurrentState.timestep,
          stoppingCriteria: solverCurrentState.stoppingCriteria,
        }}
        onSubmit={async (values) => {
          const {
            coOrdinateSystem,
            type,
            startTime,
            endTime,
            timeStep,
            stoppingCriteria,
            massMatrixType,
          } = values;

          dispatch(
            updateSolver({
              coOrdinateSystem,
              type,
              startTime,
              endTime,
              timeStep,
              stoppingCriteria,
              massMatrixType,
            })
          );

          dispatch(
            modalOff({
              route: url,
              id: id,
            })
          );
        }}
      >
        <Form>
          <div className="flex flex-col gap-2">
            <>
              <>
                <ValueInput
                  label="Start Time"
                  name="startTime"
                  placeholder=""
                />
                <ValueInput label="End Time" name="endTime" placeholder="" />
                <ValueInput label="Time Step" name="timeStep" placeholder="" />
                <ValueInput
                  label="Stopping Criteria"
                  name="stoppingCriteria"
                  placeholder=""
                />
              </>
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
      </Formik>
    </div>
  );
};
