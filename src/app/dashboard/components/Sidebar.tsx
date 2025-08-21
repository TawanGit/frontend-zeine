"use client";

import { LogOut, Settings, User } from "lucide-react";

function SidebarComponent() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <aside className="hidden md:flex w-30 bg-black flex-col justify-between items-center py-6">
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
              onClick={handleLogout}
            >
              <LogOut className="text-gray-400 hover:text-gray-300" />
            </button>
          </nav>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-black py-2 md:hidden border-t border-gray-800">
        <button className="flex flex-col items-center text-lime-400 hover:text-lime-300">
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Perfil</span>
        </button>
        <button
          className="flex flex-col items-center text-gray-400 hover:text-gray-300"
          onClick={() => alert("Pagina de Configuração")}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs mt-1">Config</span>
        </button>
        <button
          className="flex flex-col items-center text-gray-400 hover:text-gray-300"
          onClick={handleLogout}
        >
          <LogOut className="w-6 h-6" />
          <span className="text-xs mt-1">Sair</span>
        </button>
      </nav>
    </>
  );
}

export default SidebarComponent;
