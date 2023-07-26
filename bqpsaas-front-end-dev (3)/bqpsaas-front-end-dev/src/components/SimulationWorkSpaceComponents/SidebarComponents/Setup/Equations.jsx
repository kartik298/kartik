import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addEquation,
  equationsState,
  updateEquationAccordion,
} from "../../../../features/simulationWorksapce/SolverInputSlice";
import { Accordion } from "../../../CommonComponents/Accordion";
import { SettingHeading } from "../../Extras/SettingHeading";
import { EquationForm } from "./FormComponents/EquationForm";

// physics, model, solver, equation name
export const Equations = ({ id, url }) => {
  const equationsCurrentState = useSelector(equationsState);

  const dispatch = useDispatch();
  const addHandler = (event) => {
    event.preventDefault();
    dispatch(addEquation());
  };

  const equationAccordionSwitchHandler = (index) => {
    dispatch(updateEquationAccordion({ index }));
  };

  return (
    <>
      <SettingHeading name="Domain" addHandler={addHandler} />
      {equationsCurrentState.length !== 0 &&
        equationsCurrentState.map((equationState, index) => (
          <Accordion
            key={index}
            accordion={equationState.accordion}
            name={equationState.name}
            accordionHandler={() => equationAccordionSwitchHandler(index)}
          >
            <EquationForm equationState={equationState} index={index} />
          </Accordion>
        ))}
    </>
  );
};

// top bar model can be geometry

// call it a model
