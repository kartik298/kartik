import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

export function Accordion({ accordionHandler, accordion, name, children }) {
  return (
    <div>
      <div
        className={`cursor-pointer flex items-center justify-between p-1.5 hover:bg-gray-400 ${!accordion ? "bg-gray-300" : "bg-gray-400 text-black"
          } rounded-md`}
        onClick={accordionHandler}
      >
        <span className="font-normal capitalize">{name}</span>
        <div className="border-2 p-1 rounded-md text-md border-black">
          {accordion ? <AiOutlineUp /> : <AiOutlineDown />}
        </div>
      </div>
      {accordion && children}
    </div>
  );
}
