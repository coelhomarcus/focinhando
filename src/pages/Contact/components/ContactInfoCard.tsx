import type { ReactNode } from "react";

interface ContactInfoCardProps {
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  title: string;
  primaryText: string;
  secondaryText?: string;
  link?: {
    href: string;
    text: string;
    external?: boolean;
  };
}

const ContactInfoCard = ({
  icon,
  iconBgColor,
  iconColor,
  title,
  primaryText,
  secondaryText,
  link,
}: ContactInfoCardProps) => {
  return (
    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
      <div
        className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center text-2xl shrink-0`}
      >
        <div className={iconColor}>{icon}</div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1 text-gray-900">{title}</h3>
        <p className="text-gray-700 font-medium mb-2">{primaryText}</p>
        {secondaryText && (
          <span className="text-sm text-gray-500">{secondaryText}</span>
        )}
        {link && (
          <a
            href={link.href}
            {...(link.external && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
            className="text-focinhando-accent font-medium text-sm hover:underline block mt-2"
          >
            {link.text}
          </a>
        )}
      </div>
    </div>
  );
};

export default ContactInfoCard;
