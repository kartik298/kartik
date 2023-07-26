import { AiOutlinePlus } from "react-icons/ai";

export function SettingHeading({ name, addHandler }) {
  return (
    <div className="flex items-center justify-between bg-gray-300 p-1.5 rounded-md">
      <span>{name}</span>
      <button
        className="text-black border-2 border-black rounded-md p-1 bg-green-500 text-md font-extrabold"
        onClick={addHandler}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
}
