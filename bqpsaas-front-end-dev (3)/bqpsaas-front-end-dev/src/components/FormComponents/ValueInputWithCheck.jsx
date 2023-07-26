import { Field } from "formik";
import React from "react";
import { CheckInput } from "./CheckInput";
import EquationDisplay from "../EquationDisplay";

export function ValueInputWithCheck({
  label,
  name,
  placeholder,
  type,
  isEnabled,
  checkName,
  unit,
}) {
  let flag = false;
  if (isEnabled === true) {
    flag = false;
  } else {
    flag = true;
  }
  return (
    <div className="flex flex-col gap-2 items-start justify-between w-full">
      <label htmlFor={name} className="font-medium">
        {label} {unit ? <EquationDisplay unit={unit} /> : ""}
      </label>
      <div className="flex">
        <CheckInput label="" name={checkName} />
        <Field
          type={type ? type : "text"}
          name={name}
          placeholder={placeholder}
          className="w-2/4 px-2 py-1 mx-3 rounded-md border-2 border-gray-500"
          disabled={flag}
        />
      </div>
    </div>
  );
}
