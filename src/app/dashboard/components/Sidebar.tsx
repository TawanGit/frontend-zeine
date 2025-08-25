"use client";

import { LogOut, Settings, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
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
      <aside className="hidden md:flex md:h-[80%] px-4 w-28 bg-black flex-col items-center py-6">
        <div className="flex flex-col items-center mt-12">
          <img src="logo.png" alt="logo" className="w-8 h-8 mb-10" />
        </div>

        <nav className="flex flex-col justify-center items-center gap-6 flex-1">
          <SidebarItem
            icon={User}
            active={userActive}
            onClick={() => router.push("/dashboard")}
          />
          <SidebarItem
            icon={Settings}
            active={settingsActive}
            onClick={() => router.push("/settings")}
          />
          <SidebarItem icon={LogOut} onClick={handleLogout} />
        </nav>
      </aside>

      <div className="fixed bottom-0 left-0 right-0 bg-black flex justify-around items-center py-2 md:hidden shadow-lg z-50">
        <SidebarItem
          icon={User}
          active={userActive}
          onClick={() => router.push("/dashboard")}
        />
        <SidebarItem
          icon={Settings}
          active={settingsActive}
          onClick={() => router.push("/settings")}
        />
        <SidebarItem icon={LogOut} onClick={handleLogout} />
      </div>
    </>
  );
}
