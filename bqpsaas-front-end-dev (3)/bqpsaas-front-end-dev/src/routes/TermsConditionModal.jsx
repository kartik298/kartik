import { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useOnClickOutside } from '../hooks/useOnClickOutside'

export default function TermsConditionModal({ customStyle, closeMo }) {
  const outsideRef = useRef(null);
  useOnClickOutside(outsideRef);
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h4 className="text-2xl font-semibold">
                BQPhy Team Welcomes You !!!
              </h4>
              <button
                className="text-red-500 background-transparent font-bold uppercase text-xl outline-none focus:outline-none ml-auto p-2 ease-linear transition-all duration-150 hover:shadow-md"
                onClick={closeMo} ref={outsideRef}
              >
                <AiOutlineClose />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto text-left">
              <p className="my-4 text-slate-500 text-md leading-relaxed">
                This is a free research preview.
                <br />
                <br />
                Our goal is to get external feedback in order to improve our software. The system may occasionally generate error or might not work as expected. We look forward to hearing those in the feedback.
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
              {/* <button
                className="bg-red-500 text-black active:bg-green-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-xl outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeMo} ref={outsideRef}
              >
                Close
              </button> */}
              <button
                className="bg-green-400 text-black active:bg-green-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeMo}
              >
                I accept
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}