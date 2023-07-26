import { Field } from "formik";

export function SelectInput({
  label,
  name,
  selectList,
  isDisabled,
  fullWidth,
}) {
  const hasItem=selectList.length>1;
  return (
    <div className="flex flex-col gap-2 items-start justify-between w-full">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <Field
        as="select"
        name={name}
        className={`${
          fullWidth ? "w-100" : "w-3/4"
        } px-2 py-1 rounded-md border-2 border-gray-500 ${isDisabled|| !hasItem?"appearance-none":""}`}
        disabled={isDisabled||!hasItem}
      >
        {selectList.map((selectOption, idx) => {
          return (
            <option key={idx} value={selectOption.option}>{selectOption.display}</option>
          );
        })}
      </Field>
    </div>
  );
}
