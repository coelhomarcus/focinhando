import { useState, useRef, useEffect } from "react";
import { FaWhatsapp, FaEnvelope, FaShareAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-xl" />,
      color: "hover:bg-green-50 hover:text-green-600",
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "X (Twitter)",
      icon: <FaXTwitter className="text-xl" />,
      color: "hover:bg-gray-100 hover:text-gray-900",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "Email",
      icon: <FaEnvelope className="text-xl" />,
      color: "hover:bg-blue-50 hover:text-blue-600",
      url: `mailto:?subject=${encodedTitle}&body=Confira%20este%20artigo:%20${encodedUrl}`,
    },
  ];

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all duration-300 backdrop-blur-sm border border-white/30"
        aria-label="Compartilhar publicação"
      >
        <FaShareAlt className="text-base" />
        <span className="text-sm">Compartilhar</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 min-w-[220px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 animate-slideUp">
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
              Compartilhar via
            </div>
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleShare(option.url)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-gray-700 transition-colors ${option.color}`}
              >
                <span className="flex items-center justify-center w-8">
                  {option.icon}
                </span>
                <span className="font-medium">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;
