import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MultipleSelectElement({ initValue, options, complex }) {
  const [state, setState] = useState({ open: false });
  const [value, setValue] = useState(initValue);

  const testStructure = (arg) =>
    complex && arg.piece
      ? arg.name + " | " + arg.piece
      : complex && arg.origin
      ? arg.name + " | " + arg.origin
      : complex
      ? arg.name
      : arg;

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);
  return (
    <div className="flex-auto flex justify-end">
      {state.open ? (
        <div className="flex flex-col items-between bg-gray-600 rounded-md px-2 py-1 absolute">
          {options.map((opt, index) => {
            return (
              <div
                className="hover:bg-blue-400 flex justify-between cursor-pointer"
                onClick={() => {
                  setValue(opt);
                  setState({ open: false });
                }}
                key={opt._id || index}
              >
                <div className="flex justify-center items-center w-8">
                  <FontAwesomeIcon
                    icon={["fas", "check"]}
                    className={`text-xl text-white mx-2 ${
                      value._id && value._id !== opt._id
                        ? "hidden"
                        : !value._id && value !== opt
                        ? "hidden"
                        : ""
                    }`}
                  />
                </div>
                <span className="text-white mx-4">{testStructure(opt)}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="flex justify-end items-center"
          onClick={() => {
            setState({ open: true });
          }}
        >
          <span className="mx-4">{testStructure(value)}</span>
          <FontAwesomeIcon icon={["fas", "caret-down"]} className="text-xl" />
        </div>
      )}
    </div>
  );
}
