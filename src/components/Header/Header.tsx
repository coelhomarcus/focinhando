import { useState } from "react";
import { useUserData } from "../../hooks/useUserData";

import { Logo } from "./components/Logo";
import { DesktopNav } from "./components/DesktopNav";
import { UserMenu } from "./components/UserMenu";
import { MobileMenuButton } from "./components/MobileMenuButton";
import { MobileMenu } from "./components/MobileMenu";

const Header = () => {
  const { user, getUserAvatar, handleLogout } = useUserData();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex md:grid md:grid-cols-[1fr_auto_1fr] justify-between items-center h-20 gap-4">
          <Logo />
          <DesktopNav />
          <div className="flex items-center md:justify-end gap-3">
            <UserMenu
              user={user}
              getUserAvatar={getUserAvatar}
              handleLogout={handleLogout}
            />
            <MobileMenuButton
              isOpen={showMobileMenu}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            />
          </div>
        </div>

        <MobileMenu
          isOpen={showMobileMenu}
          user={user}
          getUserAvatar={getUserAvatar}
          handleLogout={handleLogout}
          onClose={() => setShowMobileMenu(false)}
        />
      </div>
    </header>
  );
};

export default Header;
