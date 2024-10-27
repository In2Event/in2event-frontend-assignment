import { User } from '@/schemas/user';
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type InputPropType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label?: string; className?: string; error?: string };

export type IContext= {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  loading: boolean;
  error: string | null;
}