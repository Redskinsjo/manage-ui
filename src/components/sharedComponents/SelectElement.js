import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalState, GlobalDispatch } from "../../redux/GlobalProvider";

export default function SelectElement({
  id,
  initValue,
  options,
  complex,
  onChangeSelect = null,
  classnames = null,
  elem = null,
  reset,
}) {
  const [state, setState] = useState({ open: false });
  const [value, setValue] = useState(initValue);
  const { ui } = useContext(GlobalState);
  const { selectElem } = ui;
  const { displaySelectElem } = useContext(GlobalDispatch);

  const testStructure = (arg) => {
    if (typeof arg === "string") {
      return arg;
    }

    if (elem === "dish") {
      return complex && arg.piece
        ? arg.name + " | " + arg.piece
        : complex && arg.origin
        ? arg.name + " | " + arg.origin
        : complex
        ? arg.name
        : arg;
    }

    if (elem === "table") {
      return arg.numero;
    }
  };

  useEffect(() => {
    setValue(initValue);
  }, [initValue, reset]);

  return (
    <div
      className={
        classnames
          ? classnames + "flex-auto flex justify-end ml-4"
          : "flex-auto flex justify-end ml-4"
      }
    >
      {selectElem === id && state.open ? (
        <div className="flex flex-col items-between bg-gray-600 rounded-md px-2 py-1 relative z-10">
          {options.map((opt, index) => {
            return (
              <div
                className="hover:bg-blue-400 group flex justify-between cursor-pointer"
                onClick={
                  onChangeSelect
                    ? (e) => {
                        e.stopPropagation();
                        onChangeSelect(opt);
                        setValue(opt);
                        setState({ open: false });
                      }
                    : (e) => {
                        e.stopPropagation();
                        setValue(opt);
                        setState({ open: false });
                      }
                }
                // onChange={
                //   onChangeSelect &&
                //   function (e) {
                //     console.log(e);
                //     onChangeSelect("opt");
                //   }
                // }
                key={opt._id || index}
              >
                <div className="flex justify-center items-center w-8">
                  <FontAwesomeIcon
                    icon={["fas", "check"]}
                    className={`text-yellow-300 text-xl text-white mx-2 ${
                      value._id && value._id !== opt._id
                        ? "hidden"
                        : !value._id && value !== opt
                        ? "hidden"
                        : ""
                    }`}
                  />
                </div>
                <span className="mx-4 flex-1">
                  <div className="group-hover:font-bold group-hover:tracking-tight text-white w-92%">
                    {testStructure(opt)}
                  </div>
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="flex justify-end items-center cursor-pointer hover:bg-gray-100 px-2 py-1 w-full"
          onClick={(e) => {
            setState({ open: true });
            e.stopPropagation();
            displaySelectElem(id);
          }}
        >
          <span className="mx-4">{testStructure(value)}</span>
          <FontAwesomeIcon icon={["fas", "caret-down"]} className="text-xl" />
        </div>
      )}
    </div>
  );
}
