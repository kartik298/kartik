import { useDispatch, useSelector } from "react-redux";
import { SettingHeading } from "../../Extras/SettingHeading";
import { DistributedForceForm } from "./FormComponents/LoadsForm/DistributedForceForm";
import { PointForceForm } from "./FormComponents/LoadsForm/PointForceForm";
import {
  addDistributedForce,
  addPointForce,
  distributedForce,
  pointForce,
  updateDistributedForceAccordion,
  updatePointForceAccordion,
} from "../../../../features/simulationWorksapce/SolverInputSlice";
import { Accordion } from "../../../CommonComponents/Accordion";

export function Loads({ url, id }) {
  const dispatch = useDispatch();
  const distributedForceState = useSelector(distributedForce);
  const pointForceState = useSelector(pointForce);

  return (
    <>
      <SettingHeading
        name="Distributed Force"
        addHandler={() => dispatch(addDistributedForce())}
      />
      {distributedForceState?.map((dfState, index) => (
        <Accordion
          accordion={dfState.accordion}
          name={dfState.name}
          accordionHandler={() =>
            dispatch(updateDistributedForceAccordion({ index }))
          }
        >
          <DistributedForceForm dfState={dfState} index={index} />
        </Accordion>
      ))}
      <SettingHeading
        name="Point Force"
        addHandler={() => dispatch(addPointForce())}
      />
      {pointForceState?.map((pfState, index) => (
        <Accordion
          accordion={pfState.accordion}
          name={pfState.name}
          accordionHandler={() =>
            dispatch(updatePointForceAccordion({ index }))
          }
        >
          <PointForceForm pfState={pfState} index={index} />
        </Accordion>
      ))}
    </>
  );
}
