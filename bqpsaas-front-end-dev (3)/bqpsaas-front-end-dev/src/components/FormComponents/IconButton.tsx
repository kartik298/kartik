import { AiOutlineCheck } from "react-icons/ai";

export function IconButton() {
  return (
    <button
      className="text-black border-2 border-black rounded-md p-1 bg-green-500 text-md font-medium flex justify-center items-center"
      type="submit">
      <AiOutlineCheck />
    </button>
  );
}
