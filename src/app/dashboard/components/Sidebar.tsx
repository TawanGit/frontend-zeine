"use client";

import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function SidebarComponent() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const userActive = pathname === "/dashboard";
  const settingsActive = pathname === "/settings";

  return (
    <>
      <aside className="hidden md:flex px-4 w-30 bg-black flex-col justify-between items-center py-6">
        <div className="flex flex-col items-center gap-6">
          <img src="logo.png" alt="logo" className="w-6 h-6 my-10" />
          <nav className="flex flex-col gap-6">
            <button
              className={`p-3 rounded-lg transition-colors duration-200 ${
                userActive
                  ? "bg-lime-500 text-black"
                  : "bg-[#2c2c2c] text-lime-400 hover:bg-[#3a3a3a] hover:text-lime-300"
              }`}
              onClick={() => router.push("/dashboard")}
            >
              <User className="w-6 h-6" />
            </button>

            <Link href="/settings">
              <button
                className={`p-3 rounded-lg transition-colors duration-200 ${
                  settingsActive
                    ? "bg-lime-500 text-black"
                    : "bg-[#2c2c2c] text-gray-400 hover:bg-[#3a3a3a] hover:text-gray-300"
                }`}
              >
                <Settings className="w-6 h-6" />
              </button>
            </Link>

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
        <button
          className={`flex flex-col items-center text-xs mt-1 transition-colors duration-200 ${
            userActive ? "text-lime-400" : "text-gray-400 hover:text-lime-300"
          }`}
          onClick={() => router.push("/dashboard")}
        >
          <User className="w-6 h-6" />
          <span>Perfil</span>
        </button>

        <Link href="/settings">
          <button
            className={`flex flex-col items-center text-xs mt-1 transition-colors duration-200 ${
              settingsActive
                ? "text-lime-400"
                : "text-gray-400 hover:text-lime-300"
            }`}
          >
            <Settings className="w-6 h-6" />
            <span>Config</span>
          </button>
        </Link>

        <button
          className="flex flex-col items-center text-gray-400 hover:text-gray-300 text-xs mt-1"
          onClick={handleLogout}
        >
          <LogOut className="w-6 h-6" />
          <span>Sair</span>
        </button>
      </nav>
    </>
  );
}

export default SidebarComponent;
