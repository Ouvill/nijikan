import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
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
      "active:bg-gray-900  ",
      "active:border-none",
      "px-4",
      "transition",
      disabled ? "opacity-50" : "",
      disabled ? "hover:bg-gray-700" : "hover:bg-gray-800",
      className || "",
    ].join(" ")}
    {...props}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
