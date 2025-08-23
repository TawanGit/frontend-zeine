"use client";

import { LogOut, Settings, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SidebarItem from "./SidebarItem";

export default function SidebarMobile() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const userActive = pathname === "/dashboard";
  const settingsActive = pathname === "/settings";

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-black py-2 md:hidden border-t border-gray-800">
      <SidebarItem
        icon={User}
        active={userActive}
        onClick={() => router.push("/dashboard")}
        label="Perfil"
      />
      <SidebarItem
        icon={Settings}
        active={settingsActive}
        onClick={() => router.push("/settings")}
        label="Config"
      />
      <SidebarItem icon={LogOut} onClick={handleLogout} label="Sair" />
    </nav>
  );
}
