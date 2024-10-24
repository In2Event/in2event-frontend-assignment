import { cn } from "@/lib/utils";
import { InputPropType } from "@/types";
import React from "react";

const Input = ({ error, label, className, ...props }: InputPropType) => {
  return (
    <div>
      <label className="block mb-1">{label}</label>
      <input
        {...props}
        min={0}
        className={cn(
          "border px-3 py-2 rounded-xl w-full outline-none",
          className
        )}
      />
      <p className="text-red-500 mt-1 text-xs">{error}</p>
    </div>
  );
};

export default Input;
