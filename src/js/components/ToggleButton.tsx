import React from "react";

type Props = Omit<React.ButtonHTMLAttributes<HTMLInputElement>, "type"> & {
  checked: boolean;
};

export const ToggleButton: React.FC<Props> = ({ className, ...props }) => {
  return (
    <label
      className={[
        "inline-block",
        "relative",
        "w-12",
        "h-6",
        "rounded-2xl",
        "cursor-pointer",
        "transition",
        props.checked ? "bg-green-500 " : "bg-gray-600",
        "after:absolute",
        "after:top-0",
        "after:left-0",
        "after:w-6",
        "after:h-6",
        "after:rounded-2xl",
        "after:drop-shadow-2xl",
        "after:bg-white",
        "after:content-['']",
        "after:transition-all",
        props.checked ? "after:left-6" : "",
        className ?? "",
      ].join(" ")}
    >
      <input type="checkbox" className="hidden" {...props} />
    </label>
  );
};
