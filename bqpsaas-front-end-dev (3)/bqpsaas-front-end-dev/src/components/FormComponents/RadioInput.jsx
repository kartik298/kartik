import { Field } from "formik";

export function RadioInput({ name, value, optionName }) {
  return (
    <label className="flex items-center gap-2 sm:mr-2">
      <Field type="radio" name={name} value={value} key={`value-${optionName}`} />
      {optionName}
    </label>
  );
}