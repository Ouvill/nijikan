export type InputBaseProps = React.InputHTMLAttributes<HTMLInputElement> & {};

export const Input: React.FC<InputBaseProps> = ({ className, ...props }) => {
  return (
    <input
      className={[
        "px-2",
        "box-content",
        "border",
        "rounded-sm",
        "outline-none",
        "focus:ring",
        "focus:ring-2",
        "focus:ring-blue-400",
        `${className}`,
      ].join(" ")}
      {...props}
    ></input>
  );
};
