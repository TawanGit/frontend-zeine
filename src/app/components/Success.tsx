"use client";
import { FC } from "react";
import { CheckCircle } from "lucide-react";

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: FC<SuccessMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-2 my-2 p-3 rounded-md bg-green-600/20 text-green-700 border border-green-600 mt-4">
      <CheckCircle size={18} />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default SuccessMessage;
