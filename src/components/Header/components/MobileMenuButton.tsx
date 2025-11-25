import { FaBars, FaTimes } from "react-icons/fa";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MobileMenuButton = ({
  isOpen,
  onClick,
}: MobileMenuButtonProps) => {
  return (
    <button
      className="md:hidden p-2 rounded-lg hover:bg-focinhando-accent/10 transition-colors"
      onClick={onClick}
      aria-label="Menu"
    >
      {isOpen ? (
        <FaTimes className="w-6 h-6 text-gray-700" />
      ) : (
        <FaBars className="w-6 h-6 text-gray-700" />
      )}
    </button>
  );
};
