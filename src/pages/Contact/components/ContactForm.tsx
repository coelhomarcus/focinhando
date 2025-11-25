import { useState, useEffect } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useApi } from "@/hooks/useApi";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

interface ContactFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  initialData?: Partial<ContactFormData>;
}

const ContactForm = ({ initialData }: ContactFormProps) => {
  const { apiBaseUrl } = useApi();
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: initialData?.fullName || "",
    email: initialData?.email || "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (initialData?.fullName || initialData?.email) {
      setFormData((prev) => ({
        ...prev,
        fullName: initialData.fullName || prev.fullName,
        email: initialData.email || prev.email,
      }));
    }
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus("idle");

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`${apiBaseUrl}/contact/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error) {
        setSubmitStatus("error");
        console.error("Erro ao enviar mensagem:", data.error);
      } else {
        setSubmitStatus("success");
        setFormData({
          fullName: initialData?.fullName || "",
          email: initialData?.email || "",
          phoneNumber: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <h2 className="text-3xl font-bold mb-2 text-gray-900">
        Envie sua Mensagem
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Preencha o formulário e responderemos em breve
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="fullName"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Nome Completo
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            readOnly
            disabled
            placeholder="Carregando..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-200 text-gray-600 cursor-not-allowed text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Preenchido automaticamente com seus dados
          </p>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
            disabled
            placeholder="Carregando..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-200 text-gray-600 cursor-not-allowed text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Preenchido automaticamente com seus dados
          </p>
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Telefone <span className="text-gray-400 text-xs">(opcional)</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="(00) 12345-6789"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-focinhando-accent/50 focus:outline-none transition text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Assunto <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-focinhando-accent/50 focus:outline-none transition bg-white text-sm"
          >
            <option value="">Selecione um assunto</option>
            <option value="Quero adotar um pet">Quero adotar um pet</option>
            <option value="Quero cadatrar um pet">
              Quero cadastrar um pet
            </option>
            <option value="Dúvidas gerais">Dúvidas gerais</option>
            <option value="Sugestões">Sugestões</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Mensagem <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
            rows={5}
            placeholder="Conte-nos como podemos ajudar... (mínimo 10 caracteres)"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-focinhando-accent/50 focus:outline-none transition resize-none text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">Mínimo de 10 caracteres</p>
        </div>

        {submitStatus === "success" && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-3">
            <FaCheckCircle className="text-xl" />
            <span className="text-sm font-medium">
              Mensagem enviada com sucesso! Responderemos em breve.
            </span>
          </div>
        )}
        {submitStatus === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-3">
            <FaTimesCircle className="text-xl" />
            <span className="text-sm font-medium">
              Erro ao enviar. Tente novamente.
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-6 py-3 rounded-lg font-medium text-sm transition-all ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-focinhando-accent text-white hover:bg-focinhando-accent-dark cursor-pointer active:scale-[0.98]"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin h-4 w-4" />
              Enviando...
            </span>
          ) : (
            "Enviar Mensagem"
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
