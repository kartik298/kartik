import { Field } from "formik";

export function NoValueInput({ label, name, type, values, styleData={pointerEvents:"none"}}) {
  return (
    <>
      <span className="font-medium">{label}</span>
      <Field
        type={type ? type : "text"}
        name={name}
        onChange={()=>''}
        className="select-none w-100 px-2 py-1 rounded-md border-2 border-gray-500"
        value={values}
        spellCheck={false}
        style={styleData}
      />
    </>
  );
}
