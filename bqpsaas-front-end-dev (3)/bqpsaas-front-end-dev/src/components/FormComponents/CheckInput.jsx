import { Field } from "formik";

export function CheckInput({ label, name }) {
  return (
    <label className="flex items-center gap-2 sm:gap-1 sm:mr-2">
      <Field type="checkbox" name={name} />
      {label}
    </label>
  );
}
