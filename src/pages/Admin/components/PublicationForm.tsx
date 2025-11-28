import { useState } from "react";
import type {
  PublicationForm as PublicationFormType,
  PublicationFormProps,
} from "../types";
import { StatusMessage } from "./SharedComponents";
import { FaSpinner } from "react-icons/fa";

const PublicationForm = ({ apiBaseUrl }: PublicationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [publicationForm, setPublicationForm] = useState<PublicationFormType>({
    title: "",
    topic: "",
    img: "",
    text: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env
    .VITE_CLOUDINARY_UPLOAD_PRESET;

  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url) {
        setPublicationForm((prev) => ({ ...prev, img: data.secure_url }));
        return data.secure_url;
      } else {
        setSubmitStatus("error");
        return null;
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      setSubmitStatus("error");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus("idle");

    let imageUrl = publicationForm.img;
    if (selectedFile) {
      imageUrl = (await uploadToCloudinary(selectedFile)) || "";
      if (!imageUrl) {
        setLoading(false);
        return;
      }
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${apiBaseUrl}/publication/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...publicationForm,
          img: imageUrl,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setSubmitStatus("error");
        console.error("Erro ao cadastrar publicação:", data.error);
      } else {
        setSubmitStatus("success");
        setPublicationForm({
          title: "",
          topic: "",
          img: "",
          text: "",
        });
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Nova Publicação</h2>
        <p className="text-sm text-gray-600 mt-1">
          Crie uma nova publicação para o blog
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={publicationForm.title}
            onChange={(e) =>
              setPublicationForm({ ...publicationForm, title: e.target.value })
            }
            required
            placeholder="Digite o título da publicação"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition text-sm"
          />
        </div>

        {/* Grid de 2 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Tópico */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={publicationForm.topic}
              onChange={(e) =>
                setPublicationForm({
                  ...publicationForm,
                  topic: e.target.value,
                })
              }
              required
              placeholder="Ex: Adoção, Dicas, Saúde"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition text-sm"
            />
          </div>

          {/* Imagem Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem <span className="text-red-500">*</span>
            </label>
            <label className="w-full cursor-pointer">
              <div
                className={`w-full px-4 py-2.5 rounded-lg border-2 transition flex items-center justify-center gap-2 ${
                  uploading
                    ? "border-focinhando-accent bg-focinhando-accent/5 cursor-wait"
                    : "border-gray-300 bg-gray-50 hover:border-focinhando-accent hover:bg-gray-100"
                }`}
              >
                {uploading ? (
                  <span className="text-focinhando-accent font-semibold">
                    Enviando imagem...
                  </span>
                ) : (
                  <span className="text-gray-700">
                    {selectedFile ? selectedFile.name : "Escolher arquivo"}
                  </span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setSelectedFile(file);
                }}
                disabled={uploading}
                className="hidden"
              />
            </label>
            {/* Preview da imagem */}
            {(selectedFile || publicationForm.img) && (
              <div className="mt-3 flex items-center gap-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 border-focinhando-accent/20">
                  <img
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : publicationForm.img
                    }
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-gray-600">Preview da imagem</span>
              </div>
            )}
          </div>
        </div>

        {/* Texto da Publicação */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conteúdo <span className="text-red-500">*</span>
          </label>
          <textarea
            value={publicationForm.text}
            onChange={(e) =>
              setPublicationForm({ ...publicationForm, text: e.target.value })
            }
            required
            rows={12}
            placeholder="Escreva o conteúdo da publicação aqui..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition resize-none text-sm leading-relaxed"
          />
        </div>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <StatusMessage
            type="success"
            message="Publicação criada com sucesso!"
          />
        )}
        {submitStatus === "error" && (
          <StatusMessage
            type="error"
            message="Erro ao criar publicação. Tente novamente."
          />
        )}

        {/* Submit Button */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 px-6 py-3 rounded-lg font-medium text-sm transition-all ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-focinhando-accent text-white hover:bg-gray-800 active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin h-4 w-4" />
                Publicando...
              </span>
            ) : (
              "Publicar Agora"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublicationForm;
