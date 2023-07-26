// Methods
export type MethodValuesType = [
  "coordinateSystem",
  "type",
  "startTime",
  "endTime",
  "timeStep",
  "stoppingCriteria",
  "massMatrixType"
];

export type MethodTypeType =
  | { value: "transient"; optionName: "Transient" }
  | { value: "steady"; optionName: "Steady" };

// Material
export type MaterialValuesType = [
  "name",
  "type",
  "youngsMod",
  "specificHeat",
  "nu",
  "rho",
  "thickness",
  "xx",
  "xy",
  "yy"
];

// form input types
export type labelType = {
  type: "label";
  dependentOn: false | { check: string; visibleWhen: Array<string> };
  component: {
    name: string;
  };
};

export type radioType = {
  type: "radio";
  dependentOn:
    | false
    | {
        check: string;
        visibleWhen: Array<string>;
      };
  inputID: string;
  component: {
    name: string;
    fields: Array<MethodTypeType | { value: string; optionName: string }>;
  };
};

export type buttonType = {
  type: "button";
};

export type fieldType = {
  type: "value";
  dependentOn: false | { check: string; visibleWhen: Array<string> };
  component: {
    label: string;
    name: string;
    placeholder: string;
  };
};

export type fieldArray = {
  type: "valueArray";
  dependentOn: false | { check: string; visibleWhen: Array<string> };
  component: {
    fields: Array<{
      name: string;
      placeholder: string;
    }>;
  };
};

export type FormSchemaType = {
  type: "form" | "subForm";
  formID: "SESB000" | "SESB002";
  subStore: "solverInput";
  state: "solver" | "materialProperties";
  index?: number;
  values: MethodValuesType | MaterialValuesType;
  components: Array<
    labelType | radioType | buttonType | fieldType | fieldArray
  >;
};
