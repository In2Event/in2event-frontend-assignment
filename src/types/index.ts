import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type InputPropType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label?: string; className?: string; error?: any };
