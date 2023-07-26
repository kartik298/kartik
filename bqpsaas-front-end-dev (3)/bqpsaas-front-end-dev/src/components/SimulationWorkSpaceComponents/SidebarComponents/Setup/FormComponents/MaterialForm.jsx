import { Field, Form, Formik } from "formik";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMaterialProperty,
  solverState,
  updateMaterialProperty,
} from "../../../../../features/simulationWorksapce/SolverInputSlice";
import { RadioInput } from "../../../../FormComponents/RadioInput";
import { ValueInput } from "../../../../FormComponents/ValueInput";
import Cookies from "js-cookie";
import Units from "../../../../../services/Units";
import {useState} from 'react'
export const MaterialForm = ({ materialState, index }) => {
  const dispatch = useDispatch();
  const currentSolverState = useSelector(solverState);

  const isSimulationType2D = currentSolverState[0].coordinateSystem === "2D";
  const simulationType = Cookies.get("simulation-type");
  const solidSimulation = simulationType === "solid"?true:false;
  const materialType = 
    isSimulationType2D ? 
      solidSimulation ? "PLANESTRESS" : "HeatTransfer-iso" :
      solidSimulation ? "linearElastic" : "HeatTransfer-iso" ;
  console.log(materialState);

  return (
    <div className="flex flex-col pl-2">
      <Formik
        initialValues={{
          name: materialState.name,
          type: materialType,
          youngsMod: materialState.youngsMod,
          specificHeat: materialState.specificHeat,
          nu: materialState.nu,
          rho: materialState.rho,
          thickness: isSimulationType2D?materialState.thickness:1,
          thermalConductivity: materialState.thermalConductivity,
        }}
        onSubmit={(values) => {
          dispatch(updateMaterialProperty({ values, index }));
        }}
      >
        {({ values }) => (
          <Form>
            <div className="flex flex-col gap-4">
              <ValueInput label="Name" name="name" placeholder="" />
              {simulationType === "solid" ? (
                <>
                  <ValueInput
                    label="Young's Modulus"
                    unit={Units.materials.youngsMod[0]}
                    name="youngsMod"
                    placeholder=""
                    type="number"
                  />
                  <ValueInput
                    label="Poisson's Ratio"
                    name="nu"
                    placeholder=""
                    type="number"
                  />
                </>
              ) : (
                <>
                  <ValueInput
                    label="Thermal Conductivity"
                    unit={Units.materials.thermalConductivity[0]}
                    name="thermalConductivity"
                    type="number"
                  />
                  <ValueInput
                    label="Specific Heat"
                    unit={Units.materials.specificHeat[0]}
                    name="specificHeat"
                    type="number"
                  />
                </>
              )}
              {isSimulationType2D ? (
                <ValueInput
                  label="Thickness"
                  unit={Units.materials.thickness[0]}
                  name="thickness"
                  placeholder=""
                  type="number"
                />
              ) : null}
              {!solidSimulation ? (
                <ValueInput
                label="Density"
                unit={Units.materials.rho[0]}
                name="rho"
                type="number"
              />
              ):null}
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
                    dispatch(deleteMaterialProperty({ values, index }));
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
