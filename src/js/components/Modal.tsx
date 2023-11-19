import React from "react";
import { getAppBackgroundColor } from "../lib/utils/bolt";

type Props = {
  onClose: () => void;
  children?: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ children, onClose }) => {
  const { rgb } = getAppBackgroundColor();
  return (
    <div
      className={`transition prose dark:prose-invert max-w-none z-10 fixed top-0 left-0 w-full h-full`}
    >
      <div
        className="flex justify-center h-full items-center bg-stone-900 bg-opacity-90"
        onClick={onClose}
      >
        <div
          className="shadow-lg rounded-xl"
          style={{
            backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
