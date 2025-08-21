"use client";

import { LogOut, Settings, User } from "lucide-react";

function SidebarComponent() {
  return (
    <aside className="w-30 bg-black flex flex-col justify-between items-center py-6">
      <div className="flex flex-col items-center gap-6">
        <img src="logo.png" alt="logo" className="w-6 h-6 my-10" />
        <nav className="flex flex-col gap-6">
          <button className="bg-[#2c2c2c] p-3 rounded-lg">
            <User className="text-lime-400" />
          </button>
          <button className="bg-[#2c2c2c] p-3 rounded-lg">
            <Settings className="text-gray-400" />
          </button>
          <button className="bg-[#2c2c2c] p-3 rounded-lg">
            <LogOut className="text-gray-400" />
          </button>
        </nav>
      </div>
      <div className="text-xs text-gray-400 text-center">
        Logado como:
        <br />
        <span className="text-white">Francis98@hotmail.com</span>
      </div>
    </aside>
  );
}

export default SidebarComponent;
