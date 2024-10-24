import React, { Dispatch, ReactNode } from "react";
import { CircleX } from "lucide-react";

const Modal = ({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-30 ">
      <div className="my-8 bg-white px-6 py-8 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 text-black relative">
        <h2 className="text-xl  font-bold text-xl mb-4">{title}</h2>
        <CircleX
          size={24}
          className="absolute right-3 top-3 cursor-pointer"
          onClick={onClose}
        />
        <div className="overflow-y-auto"> {children}</div>
      </div>
    </div>
  );
};

export default Modal;
