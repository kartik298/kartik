import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../routes/Dashboard/DashboardSlice";

export function useCreateSimulation() {
  const dispatch = useDispatch();

  const styles = useSelector((store: any) => store.theme.dashboard.leftSideBar);

  const createNewSimulationHandler = () => {
    dispatch(toggleModal());
  };

  return { createNewSimulationHandler, styles };
}
