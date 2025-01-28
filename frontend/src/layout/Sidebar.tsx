// Sidebar.tsx
import React from "react";
import { Home, ClipboardList, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="hidden md:flex md:w-64 bg-gray-800 text-white h-full flex-col z-50">
      {/* Logo */}
      <div className="flex iten-center justify-center p-4 text-2xl font-bold border-b border-gray-700">
        TASKBAN
      </div>

      {/* Links */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-4 p-4">
          <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
            <Home />
            <span>Início</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
            <ClipboardList />
            <span>Tarefas</span>
          </li>
          <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
            <Settings />
            <span>Configurações</span>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center gap-2 w-full hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <LogOut />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
