import { Route } from "react-router-dom";
import { SimulationWorkSpaceWidget } from "../routes/SimulationWorkspace/SimulationWorkSpaceWidget";
import { ImageWidget } from "../routes/SimulationWorkspace/SimulationWorkspaceSubRoutes/ImageWidget";

const SimulationWorkSpaceRoute = ({ url, image }) => (
  <Route exact path={url}>
    <SimulationWorkSpaceWidget>
      <ImageWidget image={image} />
    </SimulationWorkSpaceWidget>
  </Route>
);

export { SimulationWorkSpaceRoute };
