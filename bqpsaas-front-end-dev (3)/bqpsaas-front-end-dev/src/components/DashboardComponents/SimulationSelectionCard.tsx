import { Field } from "formik";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

type Props = {
  url: string;
  caption: "Solid" | "Fluid" | "Thermal" | "MBD";
  name: string;
  value: string;
  selected?: boolean;
};

export function SimulationSelectionCard({
  url,
  caption,
  name,
  value,
  selected = false,
}: Props) {
  return (
    <div className="h-40 w-full relative grid grid-cols-1 grid-rows-1 rounded-md cursor-pointer bg-yellow-400">
      <Field
        type="radio"
        name={name}
        value={value}
        className="h-full w-full absolute z-20 opacity-0"
      />
      <div className="h-full w-full rounded-md col-span-1 row-span-1">
        <img
          src={url}
          alt="solid"
          className="object-fill h-full w-full rounded-md"
        />
      </div>
      <div className="absolute h-full w-full flex rounded-md justify-center items-center">
        <div
          className={`bg-gray-500 h-full w-full rounded-md ${
            selected ? "opacity-40" : "opacity-50"
          } hover:opacity-40`}></div>
        <span className="col-span-1 text-white absolute text-2xl font-semibold">
          {caption}
        </span>
      </div>
      {selected && (
        <span className="absolute z-10 h-8 w-8 rounded-full bg-green-500 m-2 border-2 border-white text-white text-xl flex justify-center items-center">
          <AiOutlineCheck />
        </span>
      )}
    </div>
  );
}
