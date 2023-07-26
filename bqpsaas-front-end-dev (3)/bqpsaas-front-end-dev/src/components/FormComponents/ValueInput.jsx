import {useState} from 'react';
import { Field } from "formik";
import Warning from "../CommonComponents/Warning";
import EquationDisplay from "../EquationDisplay";


export function ValueInput({ label, unit, name, placeholder, type, limit=false }) {
  const [show, setShow] = useState(false)
  const inputBoxHandler=(e)=>{
    if(limit !== false){
      setShow(true)
      setTimeout(()=>{
        setShow(false)
      },1500)
    }
  }
  return (
    <div className="relative flex flex-col gap-2 items-start justify-between w-full">
      <label htmlFor={name} className="font-normal mt-2">
        {label} {unit ? <EquationDisplay unit={unit} /> : ""}
      </label>
      {
        show?(<Warning msg={`Value must lie between ${limit}`}/>):null
      }
      <Field
        step="any"
        id={name}
        type={type ? type : "text"}
        name={name}
        placeholder={placeholder}
        onClick={inputBoxHandler}
        className="w-full px-2 py-1 rounded-md border-2 border-gray-500 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
}
