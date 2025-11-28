import { Navigate, useNavigate } from "react-router";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { FaSpinner } from "react-icons/fa";
import type { User } from "@/types";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { apiBaseUrl } = useApi();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/user`, {
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
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [apiBaseUrl, token, navigate]);

  if (loading) {
    // Mostra loading enquanto verifica
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin h-12 w-12 text-focinhando-accent mx-auto" />
          <p className="mt-4 text-gray-600">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  if (!token || !user) {
    // Se não houver token ou usuário, redireciona para login
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // Se não for admin, redireciona para home
    return <Navigate to="/" replace />;
  }

  // Se for admin, renderiza o conteúdo protegido
  return <>{children}</>;
};

export default AdminRoute;
