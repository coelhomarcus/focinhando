import { useNavigate } from "react-router";
import LogoSvg from "@/assets/logo.svg";

export const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center md:justify-start">
      <img
        src={LogoSvg}
        alt="Focinhando Logo"
        className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => navigate("/")}
      />
    </div>
  );
};
