"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "cancel" | "darkCancel";
  className?: string;
}

const variantClasses = {
  primary: "bg-[#C4F120] text-black hover:bg-lime-300",
  secondary: "bg-blue-500 text-white hover:bg-blue-600",
  cancel: "bg-red-500 text-white hover:bg-red-600",
  darkCancel: "bg-[#303030] text-white hover:bg-gray-600",
};
const Button: React.FC<ButtonProps> = ({
  loading,
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`
        px-5 py-4 rounded-2xl font-bold flex items-center justify-center gap-2
        ${variantClasses[variant]}
        ${loading ? "opacity-70 cursor-not-allowed" : ""}
        ${className}
      `}
      disabled={loading}
      {...props}
    >
      {loading ? "Salvando..." : children}
    </button>
  );
};

export default Button;
