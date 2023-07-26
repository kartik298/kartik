import React from "react";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  dropdownOnOff,
  setupState,
} from "../../../components/SimulationWorkSpaceComponents/SidebarComponents/Setup/SetupSlice";
import { SideBarMenuComponent } from "../../../components/SimulationWorkSpaceComponents/SidebarComponents/SideBarMenuComponent";

export function Setup() {
  const setupStateList = useSelector(setupState);
  const dispatch = useDispatch();
  const dropdownHandler = (event) =>
    dispatch(
      dropdownOnOff({
        id: String(event.currentTarget.id),
      })
    );

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col h-full justify-between ml-auto mr-auto pt-4 pb-4 w-1/2">
        <div>
          {setupStateList.map((item) => (
            <div>
              <div
                id={item.id}
                key={item.id}
                className="flex items-center cursor-pointer"
                onClick={dropdownHandler}
              >
                <span className="text-xl">{item.name}</span>
                {!item.dropdown ? (
                  <AiFillCaretRight className="ml-auto" />
                ) : (
                  <AiFillCaretDown className="ml-auto" />
                )}
              </div>
              {!item.dropdown ? null : (
                <SideBarMenuComponent componentID={item.id} />
              )}
            </div>
          ))}
        </div>
        <button className="bg-green-600 w-max px-5 py-2 rounded-lg hover:bg-green-700 text-white text-2xl font-semibold self-end">
          Next
        </button>
      </div>
    </div>
  );
}
