import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({
  children,
  className,
  disabled,
  ...props
}) => (
  <button
    className={[
      "bg-gray-700 ",
      "hover:bg-gray-800 ",
      "active:bg-gray-900  ",
      "active:border-none",
      "px-4",
      "transition",
      " ",
      disabled ? "opacity-50" : "",
      className || "",
    ].join(" ")}
    {...props}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
