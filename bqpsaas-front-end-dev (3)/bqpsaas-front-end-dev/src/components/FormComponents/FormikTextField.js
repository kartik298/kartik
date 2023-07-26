import { useField } from "formik";

const FormikTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-7">
      <label
        className="text-sm font-bold mb-2"
        htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className="border rounded w-full py-2 px-3"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs italic pt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export { FormikTextField };
