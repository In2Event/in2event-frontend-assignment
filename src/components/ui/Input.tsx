import { cn } from "@/lib/utils";
import { InputPropType } from "@/types";
import React, { ForwardedRef } from "react";

const Input = React.forwardRef(
  (
    { error, label, className, ...props }: InputPropType,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        <label className="block mb-1">{label}</label>
        <input
          className={cn(
            "border px-3 py-2 rounded-xl w-full outline-none",
            className
          )}
          {...props}
          ref={ref}
        />
        <p className="text-red-500 mt-1 text-xs">{error}</p>
      </div>
    );
  }
);

export default Input;
