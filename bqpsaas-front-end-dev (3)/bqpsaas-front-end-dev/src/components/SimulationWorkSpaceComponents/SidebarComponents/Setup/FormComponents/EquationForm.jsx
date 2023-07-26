import { Form, Formik } from "formik";
import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  deleteEquation,
  materialPropertyState,
  updateEquation,
} from "../../../../../features/simulationWorksapce/SolverInputSlice";
import { RadioInput } from "../../../../FormComponents/RadioInput";
import { SelectInput } from "../../../../FormComponents/SelectInput";
import { ValueInput } from "../../../../FormComponents/ValueInput";
import {
  modelState,
  resetSelectedID,
} from "../../../../../renderer/modelSlice";
import { useSelector } from "react-redux";
import { simulationType, projectName } from "../../../simulationWorkspaceSlice";
import Cookies from "js-cookie";
import { solverState } from "../../../../../features/simulationWorksapce/SolverInputSlice";

export const EquationForm = ({ equationState, index }) => {
  const dispatch = useDispatch();
  const modelCurrentState = useSelector(modelState);
  const simulationType = Cookies.get("simulation-type");
  const currentSolverState = useSelector(solverState);
  const isSimulationType2D = currentSolverState[0].coordinateSystem === "2D";
  const materialsList = useSelector(materialPropertyState);
  const materialListSelect = materialsList.map((material) => ({
    option: material.name,
    display: material.name,
  }));
  const firstElement = materialsList.length > 0 ? materialsList[0].name : "";
  const domainType =
    isSimulationType2D ? 
    simulationType === "solid" ? "LINEARELASTIC" : "HeatTransfer":
    simulationType === "solid" ? "3DLINEARELASTIC" : "HeatTransfer" ;

  const [formValues, setFormValues]=useState(equationState)
  const feShapeItems=isSimulationType2D?[
    { option: "3NodeTri", display: "3NodeTri" },
    { option: "6NodeTri", display: "6NodeTri" },
    { option: "4NodeQuad", display: "4NodeQuad" },
    { option: "9NodeQuad", display: "9NodeQuad" },
    ] : [
    { option: "2NodeRod", display: "4NodeTetra" },
    { option: "8NodeHexa", display: "8NodeHexa" },
  ]
  return (
    <div className="flex flex-col pl-2">
      <Formik
        enableReinitialize
        initialValues={{
          name: equationState.name || formValues.name,
          type: domainType,
          meshField: equationState.meshField || modelCurrentState.selectedID || "",
          materialPropertyName:
            equationState.materialPropertyName || firstElement,
          feShape: equationState.feShape || feShapeItems[0].option,
          gaussPoints: equationState.gaussPoints || feShapeItems[0].option,
        }}
        validate={values=>{
          // console.log(values)
          setFormValues(values)
        }}
        onSubmit={(values) => {
          console.log("Domain : ",values);
          values.gaussPoints=parseInt(values.feShape.charAt(0))
          dispatch(updateEquation({ values, index }));
          dispatch(resetSelectedID());
        }}
      >
        {({ values }) => (
          <Form>
            <div className="flex flex-col gap-2">
              <ValueInput label="Name" name="name" placeholder="" />
              {/* <>
                <span className="font-medium">Type</span>
                <RadioInput
                  name="type"
                  value="heatTransfer"
                  optionName="Heat Transfer"
                />
                <RadioInput
                  name="type"
                  value="linearElastic"
                  optionName="Linear Elastic"
                />
              </> */}
              <ValueInput label="Domain Field" name="meshField" placeholder="" />
              <span className="font-medium">Material</span>
              <SelectInput
                label=""
                name="materialPropertyName"
                selectList={materialListSelect}
              />
              <SelectInput
                label="Element Type"
                name="feShape"
                selectList={feShapeItems}
              />

              {/* <ValueInput
                label="Gauss Point"
                name="gaussPoints"
                placeholder=""
                type="number"
              /> */}
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
                    dispatch(deleteEquation({ values }));
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
