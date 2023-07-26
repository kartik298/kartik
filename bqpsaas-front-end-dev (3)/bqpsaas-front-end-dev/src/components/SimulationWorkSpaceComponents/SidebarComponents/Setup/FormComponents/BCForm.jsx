import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueInput } from "../../../../FormComponents/ValueInput";
import { SelectInput } from "../../../../FormComponents/SelectInput";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import {
  updateInitialCondition,
  deleteInitialCondition,
  deleteNeumann,
  deleteDirichlet,
  updateNeumann,
  updateDirichlet,
  updateConditions,
  resetInitialCondition,
  neumannBC,
  dirichletBC,
} from "../../../../../features/simulationWorksapce/SolverInputSlice";
import {
  useCreateDirichletBCMutation,
  useCreateInitialBCMutation,
  useCreateNeumannBCMutation,
} from "../../../../../services/dashboard/createSimulationApi";
import toast from "react-hot-toast";
import {
  modelState,
  resetSelectedID,
} from "../../../../../renderer/modelSlice";
import { ValueInputWithCheck } from "../../../../FormComponents/ValueInputWithCheck";
import Cookies from "js-cookie";

import Units from "../../../../../services/Units";
import { solverState } from "../../../../../features/simulationWorksapce/SolverInputSlice";

export const BCForm = ({ bcState, index, constraintType, isUpdate }) => {
  const dispatch = useDispatch();
  const [addNeumann] = useCreateNeumannBCMutation();
  const [addDirichlet] = useCreateDirichletBCMutation();
  const [addInitial] = useCreateInitialBCMutation();
  const modelCurrentState = useSelector(modelState);
  const simulationType = Cookies.get("simulation-type");
  const currentNeumannCount = useSelector(neumannBC).length;
  const currentDirichletCount = useSelector(dirichletBC).length;
  const projectName = useSelector(
    (store) => store.simulationWorkspace.projectName
  );
  const currentSolverState = useSelector(solverState);
  const isSimulationType2D = currentSolverState[0].coordinateSystem === "2D";

  const deleteHandler = (values) => {
    if (constraintType === "initial") {
      dispatch(deleteInitialCondition({ values }));
    } else if (constraintType === "neumann") {
      dispatch(deleteNeumann({ values }));
    } else if (constraintType === "dirichlet") {
      dispatch(deleteDirichlet({ values }));
    } else {
      return new Error("Delete Error Boundary Conditions");
    }
  };
  const selectedType = simulationType === "solid" ? 
    [ 
      { option: "force", display: "Force" },
      { option: "displacement", display: "Displacement" },
      {option:"pressure",display:"Pressure"},
    ]:
    [ 
      { option: "temperature", display: "Temperature" },
      { option: "convectiveHeatTransfer", display: "Convection" },
      { option: "heatFlux", display: "Heat Flux" },
      { option: "internalHeatSource", display: "Internal Heat Source" },
    ]
  const [formValues, setFormValues]=useState(bcState)
  // ------------------------------------
  return (
    <div className="flex flex-col pl-2">
      <Formik
        enableReinitialize
        initialValues={{
          name: bcState.name || formValues.name,
          type: bcState.type ? bcState.type : "constant",
          meshField: bcState.meshField || modelCurrentState.selectedID || "",
          boundaryType: bcState.boundaryType ? bcState.boundaryType : "normalToBoundary",
          variable: bcState.variable
            ? bcState.variable
            : simulationType === "solid"
            ? "force"
            : "temperature",
          selected:bcState.selected || selectedType[0].option,
          value: bcState.value,
          value1: bcState.value1,
          value2: bcState.value2,
          value3: bcState.value3,
          convectionCoeff: bcState.convectionCoeff || 0,
          ambientTemp: bcState.ambientTemp || 0,
          Q: bcState.Q,
          domainSource: bcState.domainSource,
          meshFile: bcState.meshFile,
          xEnabled: bcState.xEnabled,
          yEnabled: bcState.yEnabled,
          zEnabled: bcState.zEnabled,
        }}
        validate={values=>{
          values.variable=values.selected;
          setFormValues(values)
        }}
        onSubmit={async (values) => {
          values.boundaryType = values.selected === "force" ? "components" : "normalToBoundary";
          console.log(values)
          values.variable=values.selected
          try {
            if (
              (simulationType === "solid" && (values.selected === "force" || values.selected === "pressure")) ||
              (simulationType === "thermal" && values.selected !== "temperature")
            ) {
              if (isUpdate) {
                dispatch(updateNeumann({ values, index }));
              } else {
                console.log("updateneumann with currentNeumann executed");
                dispatch(updateNeumann({ values, currentNeumannCount }));
              }
            } else {
              if (isUpdate) {
                dispatch(updateDirichlet({ values, index }));
              } else {
                dispatch(updateDirichlet({ values, currentDirichletCount }));
              }
            }

            dispatch(resetInitialCondition());
            dispatch(resetSelectedID());
          } catch (error) {
            toast.error("Error occurred");
          }
        }}
      >
        {({ values }) => (
          <Form>
            <div className="flex flex-col gap-2">
              <ValueInput label="Name" name="name" placeholder="" />
              <ValueInput label="Boundary Field" name="meshField" placeholder="" />
              <SelectInput
                label="Type"
                name="selected"
                selectList={selectedType}
                isDisabled={isUpdate}
              />
              {values.selected === "force" ? (
                <>
                  <ValueInputWithCheck
                    unit={Units.boundaryConditions.variable.force[0]}
                    label="Load X"
                    name="value1"
                    checkName="xEnabled"
                    isEnabled={values.value1 !== 0 ? true : values.xEnabled}
                    type="number"
                  />
                  <ValueInputWithCheck
                    label="Load Y"
                    unit={Units.boundaryConditions.variable.force[0]}
                    name="value2"
                    checkName="yEnabled"
                    isEnabled={values.value2 !== 0 ? true : values.yEnabled}
                    type="number"
                  />
                  {!isSimulationType2D ? (
                    <ValueInputWithCheck
                      label="Load Z"
                      unit={Units.boundaryConditions.variable.force[0]}
                      name="value3"
                      checkName="zEnabled"
                      isEnabled={values.value3 !== 0 ? true : values.zEnabled}
                      type="number"
                    />
                  ) : null}
                </>
              ) : values.selected === "displacement" ? (
                <>
                  <ValueInputWithCheck
                    label="Displacement X"
                    unit={Units.boundaryConditions.variable.displacement[0]}
                    name="value1"
                    checkName="xEnabled"
                    isEnabled={values.value1 !== 0 ? true : values.xEnabled}
                    type="number"
                  />
                  <ValueInputWithCheck
                    label="Displacement Y"
                    unit={Units.boundaryConditions.variable.displacement[0]}
                    name="value2"
                    checkName="yEnabled"
                    isEnabled={values.value2 !== 0 ? true : values.yEnabled}
                    type="number"
                  />
                  {!isSimulationType2D ? (
                    <ValueInputWithCheck
                      label="Displacement Z"
                      unit={Units.boundaryConditions.variable.displacement[0]}
                      name="value3"
                      checkName="zEnabled"
                      isEnabled={values.value3 !== 0 ? true : values.zEnabled}
                      type="number"
                    />
                  ) : null}
                </>
              ) : values.selected === "pressure" ? (
                <>

                  <ValueInput
                    label="Value"
                    unit={
                      Units.materials.youngsMod[0]
                    }
                    name="value"
                    type="number"
                  />
                </>
              ) :values.selected === "convectiveHeatTransfer" ? (
                <>
                  <ValueInput
                    label="Convection Coefficient"
                    unit={
                      Units.boundaryConditions.variable.convection
                        .convectionCoeff[0]
                    }
                    name="convectionCoeff"
                    type="number"
                  />
                  <ValueInput
                    label="Ambient Temperature"
                    unit={
                      Units.boundaryConditions.variable.convection
                        .ambientTemp[0]
                    }
                    name="ambientTemp"
                    type="number"
                  />
                </>
              ) : (
                <ValueInput
                label={
                    values.selected === "temperature" ? "Temperature" : "Value"
                  }
                  unit={
                    Units.boundaryConditions.variable.hasOwnProperty(
                      values.selected
                    )
                      ? Units.boundaryConditions.variable[values.variable][0]
                      : null
                  }
                  name="value"
                  type="number"
                />
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
                    deleteHandler(values);
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
};
