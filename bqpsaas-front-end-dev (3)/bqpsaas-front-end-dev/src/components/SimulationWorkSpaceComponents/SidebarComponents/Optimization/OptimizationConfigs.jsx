import {
  optimizationConfig,
  updateOptimizationConfig,
} from "../../../../features/simulationWorksapce/SolverInputSlice";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { modalOff } from "../../simulationWorkspaceSlice";
import { ValueInput } from "../../../FormComponents/ValueInput";
import { RadioInput } from "../../../FormComponents/RadioInput";
import { AiOutlineCheck } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { SelectInput } from "../../../FormComponents/SelectInput";
const OptimizationConfigs = ({ id, url }) => {
  const dispatch = useDispatch();
  const optimizationConfigState = useSelector(optimizationConfig);
  return (
    <div className="flex flex-col pl-2">
      <Formik
        initialValues={{
          minimize: optimizationConfigState[0].minimize,
          volumeFraction: optimizationConfigState[0].volumeFraction,
          maxIteration: optimizationConfigState[0].maxIteration,
          filterRadius: optimizationConfigState[0].filterRadius,
          fB: optimizationConfigState[0].fB

        }}
        onSubmit={async (values) => {
          const { minimize, volumeFraction, maxIteration, filterRadius, fB } = values;
          const val = values.volumeFraction
          console.log(val)
          if (val >= 0 && val <= 1 && val !== "") {
            dispatch(
              updateOptimizationConfig({
                minimize,
                volumeFraction,
                maxIteration,
                filterRadius,
                fB
              })
            );

            toast.success("Optimization config updated successfully!");
          }
          else {
            document.querySelector("#volumeFraction").style.borderColor = "#cf6258";
            setTimeout(() => {
              document.querySelector("#volumeFraction").style.borderColor = "rgba(107, 114, 128, 1)";
            }, 3000)
          }

          // dispatch(
          //   modalOff({
          //     route: url,
          //     id: id,
          //   })
          // );
        }}
      >
        <Form>
          <div className="flex flex-col gap-2">
            <>
              {/* <ValueInput
                label="Penalization"
                name="penalization"
                placeholder=""
                type="number"
              />
              <ValueInput
                label="Filter Radius"
                name="filterRadius"
                placeholder=""
                type="number"
              />
              <ValueInput
                label="Volume Fraction"
                name="volumeFraction"
                placeholder=""
                type="number"
              /> */}
              {/* <span className="font-medium">Objective Function</span> */}
              <div>
                {/* <RadioInput
                  name="minimize"
                  value="compliance"
                  optionName="Minimize"
                />
                <SelectInput
                  label=""
                  name=""
                  selectList={[{ option: "compliance", display: "Compliance" }]}
                  fullWidth={true}
                />
              </div>
              <span className="font-medium">Constraint</span>
              <div>
                <SelectInput
                  label="Type"
                  name="penalization"
                  selectList={[
                    { option: "volumeFraction", display: "Volume Fraction" },
                  ]}
                  fullWidth={true}
                />
                <ValueInput 
                  label="Value" 
                  name="volumeFraction" 
                  type="number" 
                  limit={[0,1]}
              /> */}
                <ValueInput
                  label="Number of Iteration"
                  name="maxIteration"
                  placeholder=""
                  type="number"
                />
                <ValueInput
                  label="Filter Radius"
                  name="filterRadius"
                  placeholder=""
                  type="number"
                />
                <ValueInput
                  label="Volume Fraction"
                  name="volumeFraction"
                  placeholder=""
                  type="number"
                  limit={[0,1]}
                />
              </div>
            </>
            <div className="flex justify-start gap-2 mt-3">
              <button
                className="text-black border-2 border-black rounded-md p-1 bg-green-500 text-md font-medium flex justify-center items-center"
                type="submit"
              >
                <AiOutlineCheck /> <span className="ml-2">Save Changes</span>
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default OptimizationConfigs;
