import React, { ReactElement } from "react";

// interface IReturnBarProps {
//   ref: HTMLDivElement;
//   dispatch: (value: boolean) => Promise<void>;
// }

const ReturnBar = ({ hover, setHover, dispatch }) => {
  return (
    <div
      className={`w-4 ${hover && "bg-gray-200 cursor-pointer"}`}
      onClick={() => {
        dispatch(false);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onMouseOver={(e) => {
        setHover(true);
      }}
    ></div>
  );
};

export default ReturnBar;
