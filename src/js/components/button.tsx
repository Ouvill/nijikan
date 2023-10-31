import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({ children, ...props }) => (
  <button
    className={"bg-gray-700 hover:bg-gray-800 py-2 px-4" + " " + props.className}
    {...props}
  >
    {children}
  </button>
);

export default Button;
