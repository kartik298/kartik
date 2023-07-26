import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addMaterialProperty,
  materialPropertyState,
  updateMaterialPropertyAccordion,
} from "../../../../features/simulationWorksapce/SolverInputSlice";
import { Accordion } from "../../../CommonComponents/Accordion";
import { SettingHeading } from "../../Extras/SettingHeading";
import { useAccordionSwitches } from "../../../../hooks/useAccordionSwitches";
import { MaterialForm } from "./FormComponents/MaterialForm";

// Import Required : FormSchemaType
// const MaterialSchema: FormSchemaType = {
//   type: "subForm",
//   formID: "SESB002",
//   subStore: "solverInput",
//   state: "materialProperties",
//   values: [
//     "name",
//     "type",
//     "youngsMod",
//     "specificHeat",
//     "nu",
//     "rho",
//     "thickness",
//     "xx",
//     "xy",
//     "yy",
//   ],
//   components: [
//     {
//       type: "value",
//       dependentOn: false,
//       component: {
//         name: "name",
//         label: "Name",
//         placeholder: "Enter a project name",
//       },
//     },
//     {
//       type: "label",
//       dependentOn: false,
//       component: {
//         name: "Type",
//       },
//     },
//     {
//       type: "radio",
//       dependentOn: false,
//       inputID: "SESB002",
//       component: {
//         name: "type",
//         fields: [
//           { value: "LinearElastic", optionName: "Linear Elastic" },
//           { value: "HeatTransfer-iso", optionName: "HeatTransfer-iso" },
//           { value: "HeatTransfer-aniso", optionName: "HeatTransfer-aniso" },
//         ],
//       },
//     },
//     {
//       type: "value",
//       dependentOn: { check: "type", visibleWhen: ["LinearElastic"] },
//       component: {
//         name: "youngsMod",
//         label: "Young's Modulus",
//         placeholder: "",
//       },
//     },
//     {
//       type: "value",
//       dependentOn: { check: "type", visibleWhen: ["LinearElastic"] },
//       component: {
//         name: "nu",
//         label: "Poisson's Ratio",
//         placeholder: "",
//       },
//     },
//     {
//       type: "value",
//       dependentOn: {
//         check: "type",
//         visibleWhen: ["HeatTransfer-iso", "HeatTransfer-aniso"],
//       },
//       component: {
//         name: "specificHeat",
//         label: "Specific Heat",
//         placeholder: "",
//       },
//     },
//     {
//       type: "value",
//       dependentOn: {
//         check: "type",
//         visibleWhen: ["HeatTransfer-iso", "HeatTransfer-aniso"],
//       },
//       component: {
//         name: "rho",
//         label: "RHO",
//         placeholder: "",
//       },
//     },
//     {
//       type: "value",
//       dependentOn: false,
//       component: {
//         name: "thickness",
//         label: "Thickness",
//         placeholder: "",
//       },
//     },
//     {
//       type: "label",
//       dependentOn: {
//         check: "type",
//         visibleWhen: ["HeatTransfer-iso", "HeatTransfer-aniso"],
//       },
//       component: {
//         name: "Thermal Conductivity",
//       },
//     },
//     {
//       type: "valueArray",
//       dependentOn: {
//         check: "type",
//         visibleWhen: ["HeatTransfer-iso", "HeatTransfer-aniso"],
//       },
//       component: {
//         fields: [
//           { name: "xx", placeholder: "xx" },
//           { name: "xy", placeholder: "xy" },
//           { name: "yy", placeholder: "yy" },
//         ],
//       },
//     },
//     {
//       type: "button",
//     },
//   ],
// };

// TODO: Make it one more level dynamic instead of doing the repetivtive task
// while creating the accordion states.

interface Props {
  id: string;
  url: string;
}

export const Material = ({ id, url }: Props) => {
  const dispatch = useDispatch();
  const materialPropertyCurrentState = useSelector(materialPropertyState);

  // const { accordionStates, accordionSwitchHandler } = useAccordionSwitches(
  //   materialPropertyCurrentState.length
  // );

  const materialAccordionSwitchHandler = (index: any) => {
    dispatch(updateMaterialPropertyAccordion({ index }));
  };

  const addHandler = (event: any) => {
    event.preventDefault();
    dispatch(addMaterialProperty());
  };

  return (
    <>
      <SettingHeading name="Material" addHandler={addHandler} />
      {materialPropertyCurrentState?.length > 0 &&
        materialPropertyCurrentState.map((materialState: any, index: any) => (
          <Accordion 
            key={index}
            accordion={materialState.accordion}
            accordionHandler={() => materialAccordionSwitchHandler(index)}
            name={materialState.name}
          >
            <MaterialForm materialState={materialState} index={index} />
            {/* <FormGenerator
              schema={{ ...MaterialSchema, index }}
              route="/simulation-workspace/setup"
              key={`/simulation-workspace/setup-SESB002`}
            /> */}
          </Accordion>
        ))}
    </>
  );
};
