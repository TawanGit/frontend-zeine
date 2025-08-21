"use client";

import { LogOut, Settings, User } from "lucide-react";

function SidebarComponent() {
  return (
    <aside className="w-30 bg-black flex flex-col justify-between items-center py-6">
      <div className="flex flex-col items-center gap-6">
        <img src="logo.png" alt="logo" className="w-6 h-6 my-10" />
        <nav className="flex flex-col gap-6">
          <button className="bg-[#2c2c2c] p-3 rounded-lg hover:bg-[#3a3a3a] hover:text-lime-300 transition-colors duration-200">
            <User className="text-lime-400 hover:text-lime-300" />
          </button>
          <button
            className="bg-[#2c2c2c] p-3 rounded-lg hover:bg-[#3a3a3a] hover:text-gray-300 transition-colors duration-200"
            onClick={() => alert("Pagina de Configuração")}
          >
            <Settings className="text-gray-400 hover:text-gray-300" />
          </button>
          <button
            className="bg-[#2c2c2c] p-3 rounded-lg hover:bg-[#3a3a3a] hover:text-gray-300 transition-colors duration-200"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            <LogOut className="text-gray-400 hover:text-gray-300" />
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
