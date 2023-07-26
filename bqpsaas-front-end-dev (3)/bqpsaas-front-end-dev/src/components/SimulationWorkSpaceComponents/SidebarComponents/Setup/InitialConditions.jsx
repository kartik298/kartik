import { BCForm } from "./FormComponents/BCForm";
import { updateInitialConditionAccordion } from "../../../../features/simulationWorksapce/SolverInputSlice";
import { useSelector, useDispatch } from "react-redux";
import { addInitialCondition } from "../../../../features/simulationWorksapce/SolverInputSlice";
import { initialBC } from "../../../../features/simulationWorksapce/SolverInputSlice";
import { Accordion } from "../../../CommonComponents/Accordion";
import { SettingHeading } from "../../Extras/SettingHeading";
export function InitialConditions({ id, url }) {
  const initialConditionState = useSelector(initialBC);
  const dispatch = useDispatch();
  // const solverCurrentState = useSelector(solverState);

  const addHandler = (event) => {
    event.preventDefault();
    dispatch(addInitialCondition());
  };

  const initialConditionAccordionSwitchHandler = (index) => {
    dispatch(updateInitialConditionAccordion({ index }));
  };
  return (
    <>
      <SettingHeading name="Initial Conditions" addHandler={addHandler} />
      <div className="flex flex-col gap-2">
        {initialConditionState?.map((icState, index) => (
          <Accordion
            accordion={icState.accordion}
            accordionHandler={() =>
              initialConditionAccordionSwitchHandler(index)
            }
            name={icState.name}
          >
            <BCForm bcState={icState} index={index} constraintType="initial" />
          </Accordion>
        ))}
      </div>
    </>
  );
}
