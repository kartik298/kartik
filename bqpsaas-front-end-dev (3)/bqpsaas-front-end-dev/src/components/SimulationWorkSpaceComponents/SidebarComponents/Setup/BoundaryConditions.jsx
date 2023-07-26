import { useDispatch, useSelector } from "react-redux";
import {
  dirichletBC,
  neumannBC,
} from "../../../../features/simulationWorksapce/SolverInputSlice";
import { Accordion } from "../../../CommonComponents/Accordion";
import { BCForm } from "./FormComponents/BCForm";
import {
  addNeumann,
  updateNeumannAccordion,
} from "../../../../features/simulationWorksapce/SolverInputSlice";
import { addInitialCondition } from "../../../../features/simulationWorksapce/SolverInputSlice";
import { updateInitialConditionAccordion } from "../../../../features/simulationWorksapce/SolverInputSlice";
import {
  addDirichlet,
  updateDirichletAccordion,
} from "../../../../features/simulationWorksapce/SolverInputSlice";
import { initialBC } from "../../../../features/simulationWorksapce/SolverInputSlice";
import { SettingHeading } from "../../Extras/SettingHeading";
export function BoundaryConditions({ url, id }) {
  const dispatch = useDispatch();
  const neumannState = useSelector(neumannBC);
  const dirichletState = useSelector(dirichletBC);
  const initialConditionState = useSelector(initialBC);
  const addInitialHandler = (event) => {
    event.preventDefault();
    dispatch(addInitialCondition());
  };

  const initialConditionAccordionSwitchHandler = (index) => {
    dispatch(updateInitialConditionAccordion({ index }));
  };
  const neumannAccordionSwitchHandler = (index) => {
    dispatch(updateNeumannAccordion({ index }));
  };

  const dirichletAccordionSwitchHandler = (index) => {
    dispatch(updateDirichletAccordion({ index }));
  };

  const addHandlerNeumann = (event) => {
    event.preventDefault();
    dispatch(addNeumann());
  };

  const addHandlerDirichlet = (event) => {
    event.preventDefault();
    dispatch(addDirichlet());
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <SettingHeading
          name="Boundary Conditions"
          addHandler={addInitialHandler}
        />
        {neumannState?.map((nmState, index) => (
          <Accordion
            key={index}
            accordion={nmState.accordion}
            accordionHandler={() => neumannAccordionSwitchHandler(index)}
            name={nmState.name}
          >
            <BCForm
              bcState={nmState}
              index={index}
              constraintType="neumann"
              isUpdate={true}
            />
          </Accordion>
        ))}
        {dirichletState?.map((dlState, index) => (
          <Accordion
            key={index}
            accordion={dlState.accordion}
            accordionHandler={() => dirichletAccordionSwitchHandler(index)}
            name={dlState.name}
          >
            <BCForm
              bcState={dlState}
              index={index}
              constraintType="dirichlet"
              isUpdate={true}
            />
          </Accordion>
        ))}
        {initialConditionState?.map((icState, index) => (
          <Accordion
            key={index}
            accordion={icState.accordion}
            accordionHandler={() =>
              initialConditionAccordionSwitchHandler(index)
            }
            name={icState.name}
          >
            <BCForm
              bcState={icState}
              index={index}
              constraintType="initial"
              isUpdate={false}
            />
          </Accordion>
        ))}
      </div>
    </div>
  );
}
