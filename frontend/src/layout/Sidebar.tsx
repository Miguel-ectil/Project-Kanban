"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { ClipboardList, Settings } from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Quadro", href: "/", icon: "/icons/ci_dashboard-02.svg" },
    // { name: "Tarefas", href: "/tarefas", icon: <ClipboardList /> },
    // { name: "Configurações", href: "/configuracoes", icon: <Settings /> },
  ];

  return (
    <div className="hidden md:flex md:w-64 bg-gray-800 text-white h-full flex-col z-10">
      {/* Logo */}
      <div className="flex items-center justify-center p-4 text-2xl font-bold border-b border-gray-700">
        TASKBAN
      </div>

      {/* Links */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-4 p-4">
          {menuItems.map((item) => (
            <a key={item.name} href={item.href}>
              <li
                className={`flex items-center gap-x-4 py-2 px-4 rounded-lg cursor-pointer 
                ${pathname === item.href ? "bg-[#827eadc9]" : "hover:bg-gray-700"}`}
              >
                {typeof item.icon === "string" ? (
                  <Image width={26} height={26} src={item.icon} alt={item.name} />
                ) : (
                  item.icon
                )}
                <span><strong>{item.name}</strong></span>
              </li>
            </a>
          ))}
        </ul>
      </nav>

      <div className="p-3 border-t border-gray-700">
        <button className="flex items-center justify-center gap-2 w-full hover:bg-gray-700 rounded-lg cursor-pointer">
          <span><strong>Ectil</strong></span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
