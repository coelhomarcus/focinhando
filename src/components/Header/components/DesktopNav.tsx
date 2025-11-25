import { NavLink } from "react-router";

const navLinks = [
  { to: "/", label: "Início" },
  { to: "/about", label: "Sobre" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Suporte" },
];

export const DesktopNav = () => {
  return (
    <nav className="hidden md:flex items-center gap-1 justify-self-center">
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-focinhando-accent text-white"
                : "text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};
