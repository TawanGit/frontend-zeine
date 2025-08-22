"use client";
import { FC } from "react";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-2 p-3 my-2  rounded-md bg-red-600/20 text-slate-300 border border-red-600 mt-4">
      <AlertCircle size={18} />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default ErrorMessage;
