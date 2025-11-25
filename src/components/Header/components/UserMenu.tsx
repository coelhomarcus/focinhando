import { useState } from "react";
import { useNavigate } from "react-router";
import {
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaDog,
  FaChevronDown,
} from "react-icons/fa";
import type { User } from "../types";

interface UserMenuProps {
  user: User | null;
  getUserAvatar: () => string;
  handleLogout: () => void;
}

export const UserMenu = ({
  user,
  getUserAvatar,
  handleLogout,
}: UserMenuProps) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="hidden md:block relative">
      <button
        className="flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-200 hover:border-focinhando-accent hover:bg-focinhando-accent/5 transition-all min-w-[200px]"
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        {user ? (
          <>
            <img
              src={getUserAvatar()}
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-white shadow-sm shrink-0 object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${user.name}&background=ee6551&color=fff&size=40`;
              }}
            />
            <div className="text-left flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500">
                {user.role === "admin" ? "Administrador" : "Membro"}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse shrink-0"></div>
            <div className="text-left flex-1 min-w-0 space-y-2">
              <div className="h-3.5 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
          </>
        )}
        <FaChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform shrink-0 ${
            showUserMenu ? "rotate-180" : ""
          }`}
        />
      </button>

      {showUserMenu && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
          </div>
          <button
            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent transition-colors flex items-center gap-2"
            onClick={() => {
              setShowUserMenu(false);
              navigate("/profile");
            }}
          >
            <FaUser />
            <span>Meu Perfil</span>
          </button>
          <button
            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent transition-colors flex items-center gap-2 border-t border-gray-100"
            onClick={() => {
              setShowUserMenu(false);
              navigate("/register-pet");
            }}
          >
            <FaDog />
            <span>Cadastrar Pet</span>
          </button>
          {user?.role === "admin" && (
            <button
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent transition-colors flex items-center gap-2 border-t border-gray-100"
              onClick={() => {
                setShowUserMenu(false);
                navigate("/admin");
              }}
            >
              <FaCog />
              <span>Painel Admin</span>
            </button>
          )}
          <button
            className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-2 border-t border-gray-100"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Sair</span>
          </button>
        </div>
      )}
    </div>
  );
};
