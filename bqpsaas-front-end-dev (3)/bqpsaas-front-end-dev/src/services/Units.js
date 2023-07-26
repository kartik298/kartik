const Units = {
  materials: {
    youngsMod: ["Pa"],
    nu: ["Unitless"],
    thickness: ["m"],
    thermalConductivity: ["W m^(-1) K^(-1)"],
    rho: ["Kg m^(-3)"],
    specificHeat: ["J Kg^(-1) K^(-1)"],
  },
  boundaryConditions: {
    variable: {
      force: ["N"],
      displacement: ["m"],
      temperature: ["K"],
      heatFlux: ["W m^(-2)"],
      internalHeatSource: ["W m^(-3)"],
      convection: {
        convectionCoeff: ["W m^(-2) K^(-1)"],
        ambientTemp: ["K"],
      },
    },
  },
};

export default Units;
