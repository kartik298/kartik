import { Field, Form, Formik } from "formik";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  deleteDistributedForce,
  updateDistributedForce,
} from "../../../../../../features/simulationWorksapce/SolverInputSlice";
import { RadioInput } from "../../../../../FormComponents/RadioInput";
import { ValueInput } from "../../../../../FormComponents/ValueInput";
import { SelectInput } from "../../../../../FormComponents/SelectInput";
export function DistributedForceForm({ dfState, index }) {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col pl-2">
      <Formik
        initialValues={{
          name: dfState.name,
          type: dfState.type,
          meshField: dfState.meshField,
          boundary: dfState.boundary,
          values: dfState.values,
          valueX: dfState.valueX,
          valueY: dfState.valueY,
          valueZ: dfState.valueZ,
        }}
        onSubmit={(values) => {
          dispatch(updateDistributedForce({ values, index }));
        }}
      >
        {({ values }) => (
          <Form>
            <div className="flex flex-col gap-2">
              <ValueInput label="Name" name="name" placeholder="" />
              <>
                <span className="font-medium">Boundary</span>
                <RadioInput
                  name="boundary"
                  value="normalToBoundary"
                  optionName="Normal to Boundary"
                />
                <RadioInput
                  name="boundary"
                  value="unitDirection"
                  optionName="Unit Direction"
                />
              </>
              <>
                <span className="font-medium">Type</span>
                <RadioInput
                  name="type"
                  value="constant"
                  optionName="Constant"
                />
                <RadioInput
                  name="type"
                  value="temporal"
                  optionName="Temporal"
                />
                <RadioInput
                  name="type"
                  value="constantNodalFileInput"
                  optionName="Constant Nodal File Input"
                />
                <RadioInput
                  name="type"
                  value="temporalNodalFileInput"
                  optionName="Temporal Nodal File Input"
                />
              </>

              {values.boundary === "unitDirection" ? (
                <div className="flex gap-2 items-center justify-between w-full">
                  <label htmlFor="">Values</label>
                  <Field
                    name="valueX"
                    placeholder="x"
                    className="w-1/4 px-2 py-1 rounded-md border-2 border-gray-500"
                  />
                  <Field
                    name="valueY"
                    placeholder="y"
                    className="w-1/4 px-2 py-1 rounded-md border-2 border-gray-500"
                  />
                  <Field
                    name="valueZ"
                    placeholder="z"
                    className="w-1/4 px-2 py-1 rounded-md border-2 border-gray-500"
                  />
                </div>
              ) : (
                <ValueInput label="Values" name="values" placeholder="" />
              )}
              <div className="flex gap-2">
                <button
                  className="text-black border-2 border-black rounded-md p-1 bg-green-500 text-2xl font-extrabold"
                  type="submit"
                >
                  <AiOutlineCheck />
                </button>
                <button
                  className="text-black border-2 rounded-md p-1 border-black text-2xl font-extrabold"
                  type="button"
                  onClick={() => {
                    dispatch(deleteDistributedForce({ values }));
                  }}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
