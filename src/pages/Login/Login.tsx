import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router";
import { API_BASE_URL } from "@/config/api";
import AuthLayout from "@/pages/Login/Auth/AuthLayout";
import AuthFormContainer from "@/pages/Login/Auth/AuthFormContainer";
import FormInput from "@/pages/Login/Auth/FormInput";
import AuthButton from "@/pages/Login/Auth/AuthButton";
import AlertMessage from "@/pages/Login/Auth/AlertMessage";
import LoginImage from "@/assets/login/loginImage.webp";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao fazer login");
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        setSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      setError(
        "Erro ao conectar com o servidor. Verifique se o backend está rodando."
      );
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      imageUrl={LoginImage}
      imagePosition="right"
      title='Conecte-se com quem ama <span class="text-focinhando-green-light">pets</span>!'
      subtitle="Encontre o companheiro perfeito para sua família e faça parte da nossa comunidade."
    >
      <AuthFormContainer
        title="Bem-vindo de volta!"
        subtitle="Entre com suas credenciais para acessar sua conta"
      >
        {error && <AlertMessage type="error" message={error} />}
        {success && (
          <AlertMessage
            type="success"
            message="Login realizado com sucesso! Redirecionando..."
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            id="email"
            type="email"
            label="E-mail"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            autoComplete="email"
          />

          <FormInput
            id="password"
            type="password"
            label="Senha"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            autoComplete="current-password"
          />

          <AuthButton
            loading={loading}
            loadingText="Entrando..."
            disabled={loading}
          >
            Entrar
          </AuthButton>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link
            to="/register"
            className="font-medium text-focinhando-accent hover:text-focinhando-accent-dark transition"
          >
            Criar conta gratuita
          </Link>
        </p>
      </AuthFormContainer>
    </AuthLayout>
  );
};

export default Login;
