import { NavLink, useNavigate } from "react-router";
import {
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaEdit,
  FaComments,
  FaInfoCircle,
  FaCog,
  FaDog,
} from "react-icons/fa";
import type { User } from "@/types";

interface MobileMenuProps {
  isOpen: boolean;
  user: User | null;
  getUserAvatar: () => string;
  handleLogout: () => void;
  onClose: () => void;
}

const mobileNavLinks = [
  { to: "/", label: "Início", icon: FaHome },
  { to: "/about", label: "Sobre", icon: FaInfoCircle },
  { to: "/blog", label: "Blog", icon: FaEdit },
  { to: "/contact", label: "Contato", icon: FaComments },
];

export const MobileMenu = ({
  isOpen,
  user,
  getUserAvatar,
  handleLogout,
  onClose,
}: MobileMenuProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-gray-200 py-4 space-y-1 animate-fadeIn">
      {mobileNavLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-focinhando-accent text-white"
                : "text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent"
            }`
          }
          onClick={onClose}
        >
          <link.icon className="inline mr-2" /> {link.label}
        </NavLink>
      ))}

      <div className="pt-4 mt-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3 bg-focinhando-accent/5 rounded-lg mb-2 min-h-[66px]">
          {user ? (
            <>
              <img
                src={getUserAvatar()}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm shrink-0 object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${user.name}&background=ee6551&color=fff&size=40`;
                }}
              />
              <div className="flex-1 min-w-0">
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
              <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse shrink-0"></div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-3.5 bg-gray-300 rounded animate-pulse w-24"></div>
                <div className="h-3 bg-gray-300 rounded animate-pulse w-20"></div>
              </div>
            </>
          )}
        </div>

        <button
          className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent rounded-lg transition-colors"
          onClick={() => {
            onClose();
            navigate("/profile");
          }}
        >
          <FaUser className="inline mr-2" /> Meu Perfil
        </button>
        <button
          className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent rounded-lg transition-colors"
          onClick={() => {
            onClose();
            navigate("/register-pet");
          }}
        >
          <FaDog className="inline mr-2" /> Cadastrar Pet
        </button>
        {user?.role === "admin" && (
          <button
            className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent rounded-lg transition-colors"
            onClick={() => {
              onClose();
              navigate("/admin");
            }}
          >
            <FaCog className="inline mr-2" /> Painel Admin
          </button>
        )}
        <button
          className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="inline mr-2" /> Sair
        </button>
      </div>
    </div>
  );
};
