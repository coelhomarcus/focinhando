import { useState } from "react";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaTimes,
  FaCheck,
  FaSave,
  FaUpload,
  FaImage,
} from "react-icons/fa";
import type { EditFormProps } from "../types";
import { useCity } from "@/hooks/useCity";

const EditForm = ({
  editData,
  setEditData,
  error,
  saveSuccess,
  user,
  onSave,
  onFileSelect,
  uploading,
}: EditFormProps) => {
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [selectedFileObj, setSelectedFileObj] = useState<File | null>(null);
  const { estados, cidades, loadingCidades } = useCity(editData.state);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFileName(file.name);
      setSelectedFileObj(file);
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Image Upload Section */}
      <div>
        <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          <FaUser className="text-focinhando-accent" />
          Imagem de Perfil
        </label>

        {/* File Input */}
        <div className="space-y-3">
          <label className="w-full cursor-pointer">
            <div
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 rounded-lg transition flex items-center justify-center gap-2 ${
                uploading
                  ? "border-focinhando-accent bg-focinhando-accent/5 cursor-wait"
                  : "border-gray-300 bg-gray-50 hover:border-focinhando-accent hover:bg-gray-100"
              }`}
            >
              {uploading ? (
                <>
                  <FaUpload className="text-focinhando-accent animate-pulse" />
                  <span className="text-focinhando-accent font-semibold">
                    Fazendo upload... {selectedFileName}
                  </span>
                </>
              ) : (
                <>
                  <FaImage className="text-focinhando-accent" />
                  <span className="text-gray-700">
                    {selectedFileName || "Escolher arquivo"}
                  </span>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>

          <p className="text-xs text-gray-500">
            {uploading
              ? "Aguarde... fazendo upload da imagem para o Cloudinary"
              : "Selecione uma imagem do seu computador. O upload será feito automaticamente."}
          </p>
        </div>

        {/* Preview da imagem */}
        {(selectedFileObj || editData.img) && (
          <div className="mt-3 flex items-center gap-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 border-focinhando-accent/20">
              <img
                src={
                  selectedFileObj
                    ? URL.createObjectURL(selectedFileObj)
                    : editData.img
                }
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${
                    user?.name || "User"
                  }&background=ee6551&color=fff&size=128`;
                }}
              />
            </div>
            <span className="text-xs text-gray-600">Preview da imagem</span>
          </div>
        )}
      </div>

      {/* Phone Input */}
      <div>
        <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          <FaPhone className="text-focinhando-accent" />
          Telefone
        </label>
        <input
          type="tel"
          value={editData.phoneNumber}
          onChange={(e) =>
            setEditData({ ...editData, phoneNumber: e.target.value })
          }
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-focinhando-accent/50 focus:border-focinhando-accent outline-none transition"
          placeholder="(00) 00000-0000"
        />
      </div>

      {/* City and State */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
            Estado (UF)
          </label>
          <select
            value={editData.state}
            onChange={(e) => {
              setEditData({ ...editData, state: e.target.value, city: "" });
            }}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-focinhando-accent/50 focus:border-focinhando-accent outline-none transition"
          >
            <option value="">Selecione o Estado</option>
            {estados.map((estado) => (
              <option key={estado.id} value={estado.id}>
                {estado.estado}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
            <FaMapMarkerAlt className="text-focinhando-accent" />
            Cidade
          </label>
          <select
            value={editData.city}
            onChange={(e) => setEditData({ ...editData, city: e.target.value })}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-focinhando-accent/50 focus:border-focinhando-accent outline-none transition"
            disabled={!editData.state || loadingCidades}
          >
            <option value="">
              {loadingCidades
                ? "Carregando..."
                : editData.state
                ? "Selecione a Cidade"
                : "Selecione um Estado primeiro"}
            </option>
            {cidades.map((cidadeObj) => (
              <option key={cidadeObj.cidade} value={cidadeObj.cidade}>
                {cidadeObj.cidade}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Birth Date */}
      <div>
        <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          <FaBirthdayCake className="text-focinhando-accent" />
          Data de Nascimento
        </label>
        <input
          type="date"
          value={editData.dateOfBirth}
          onChange={(e) =>
            setEditData({ ...editData, dateOfBirth: e.target.value })
          }
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-focinhando-accent/50 focus:border-focinhando-accent outline-none transition"
        />
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg flex items-center gap-2">
          <FaTimes className="shrink-0" />
          <span className="text-xs sm:text-sm">{error}</span>
        </div>
      )}

      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg flex items-center gap-2">
          <FaCheck className="shrink-0" />
          <span className="text-xs sm:text-sm">Dados salvos com sucesso!</span>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={onSave}
        className="w-full bg-focinhando-accent text-white px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base rounded-lg font-semibold hover:bg-focinhando-accent/90 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
      >
        <FaSave />
        Salvar Alterações
      </button>
    </div>
  );
};

export default EditForm;
