import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "@/config/api";
import type { User, UserComplement } from "@/types";

export const useUserData = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userComplement, setUserComplement] = useState<UserComplement | null>(
    null
  );

  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("authToken");
          navigate("/login");
          return;
        }

        const data = await response.json();
        if (!data.error && data.user) {
          setUser(data.user);
        }

        const complementResponse = await fetch(
          `${API_BASE_URL}/user/complement`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const complementData = await complementResponse.json();
        if (!complementData.error && complementData.complement) {
          setUserComplement(complementData.complement);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    loadUserData();
  }, [navigate]);

  const getUserAvatar = () => {
    if (userComplement?.img) {
      return userComplement.img;
    }
    return `https://ui-avatars.com/api/?name=${
      user?.name || "User"
    }&background=ee6551&color=fff&size=40`;
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return {
    user,
    userComplement,
    getUserAvatar,
    handleLogout,
  };
};
