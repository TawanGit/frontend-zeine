"use client";

import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
  label?: string;
}

export default function SidebarItem({
  icon: Icon,
  active,
  onClick,
  label,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 flex flex-col items-center justify-center rounded-2xl transition-all duration-200 ${
        active
          ? "bg-[#2c2c2c] text-lime-400"
          : "bg-[#1a1a1a] text-gray-400 hover:bg-[#2c2c2c] hover:text-gray-300"
      }`}
    >
      <Icon className="w-6 h-6" />
      {label && <span className="text-xs mt-1">{label}</span>}
    </button>
  );
}
