import React, { useEffect, useState } from "react";
import { BoundaryConditions } from "./Setup/BoundaryConditions";
import { Constraints } from "./Setup/Constraints";
import { Equations } from "./Setup/Equations";
import { InitialConditions } from "./Setup/InitialConditions";
import { Loads } from "./Setup/Loads";
import { Material } from "./Setup/Material";
import Methods from "./Setup/Methods";
import { Multiphysics } from "./Setup/Multiphysics";
import { Controls } from "./Simulation/Controls/Controls";
import axios from "axios";
import { baseUrl } from "../../../routes/BaseUrl";
import toast from "react-hot-toast";
import OptimizationConfigs from "./Optimization/OptimizationConfigs";

export const SideBarMenuComponent = ({ componentID, url }) => {
  const renderComponent = (id, url) => {
    switch (id) {
      case "SESB000":
        return <Methods id={id} url={url} />;
      case "SESB001":
        return <Multiphysics id={id} url={url} />;
      case "SESB002":
        return <Material id={id} url={url} />;
      case "SESB003":
        return <Equations id={id} url={url} />;
      case "SESB005":
        return <Constraints id={id} url={url} />;
      case "SESB006":
        return <Loads id={id} url={url} />;
      case "SESB007":
        return <InitialConditions id={id} url={url} />;
      case "SESB004":
        return <BoundaryConditions id={id} url={url} />;
      case "SMSB001":
        return <Controls id={id} url={url} />;
      case "OPT001":
        return <OptimizationConfigs id={id} url={url} />;
      default:
        return null;
    }
  };

  return <>{renderComponent(componentID, url)}</>;
};
