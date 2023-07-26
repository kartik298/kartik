import { Form, Formik } from "formik";
import React from "react";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  deletePointForce,
  updatePointForce,
} from "../../../../../../features/simulationWorksapce/SolverInputSlice";
import { RadioInput } from "../../../../../FormComponents/RadioInput";
import { ValueInput } from "../../../../../FormComponents/ValueInput";
import { SelectInput } from "../../../../../FormComponents/SelectInput";

export function PointForceForm({ pfState, index }) {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col pl-2">
      <Formik
        initialValues={{
          name: pfState.name,
          type: pfState.type,
          meshField: pfState.meshField,
          boundary: pfState.boundary,
          values: pfState.values,
        }}
        onSubmit={(values) => {
          dispatch(updatePointForce({ index, values }));
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
                  value="nodeNumber"
                  optionName="Node Number"
                />
                <RadioInput
                  name="boundary"
                  value="nodeFileInput"
                  optionName="Node File Input"
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
              </>
              <ValueInput label="Values" name="values" placeholder="" />
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
                    dispatch(deletePointForce({ values }));
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
