import { FaSyringe } from "react-icons/fa";
import type { PetFormFieldsProps } from "../types";
import { useCity } from "@/hooks/useCity";

const PetFormFields = ({
  petForm,
  setPetForm,
  onFileSelect,
  uploading,
  selectedFileObj,
}: PetFormFieldsProps) => {
  const { estados, cidades, loadingCidades } = useCity(petForm.state);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {/* Nome */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          Nome do pet <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={petForm.name}
          onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
          required
          placeholder="Ex: Max, Luna, Bob..."
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition"
        />
      </div>

      {/* Imagem Upload */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          Imagem do Pet <span className="text-red-500">*</span>
        </label>
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
                <span className="text-focinhando-accent font-semibold">
                  Enviando imagem...
                </span>
              </>
            ) : (
              <>
                <span className="text-gray-700">
                  {selectedFileObj ? selectedFileObj.name : "Escolher arquivo"}
                </span>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && onFileSelect) onFileSelect(file);
            }}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {/* Preview da imagem */}
        {(selectedFileObj || petForm.img) && (
          <div className="mt-3 flex items-center gap-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 border-focinhando-accent/20">
              <img
                src={
                  selectedFileObj
                    ? URL.createObjectURL(selectedFileObj)
                    : petForm.img
                }
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-gray-600">Preview da imagem</span>
          </div>
        )}
      </div>

      {/* Data de Nascimento */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          Data de nascimento <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={petForm.age}
          onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
          required
          max={new Date().toISOString().split("T")[0]}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition"
        />
      </div>

      {/* Espécie */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          Espécie <span className="text-red-500">*</span>
        </label>
        <select
          value={petForm.specie}
          onChange={(e) => setPetForm({ ...petForm, specie: e.target.value })}
          required
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition bg-white"
        >
          <option value="cão">Cão</option>
          <option value="gato">Gato</option>
        </select>
      </div>

      {/* Raça */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          Raça <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={petForm.race}
          onChange={(e) => setPetForm({ ...petForm, race: e.target.value })}
          required
          placeholder="Ex: Labrador, SRD, Siamês..."
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition"
        />
      </div>

      {/* Sexo */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          Sexo <span className="text-red-500">*</span>
        </label>
        <select
          value={petForm.sex}
          onChange={(e) => setPetForm({ ...petForm, sex: e.target.value })}
          required
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition bg-white"
        >
          <option value="macho">Macho</option>
          <option value="fêmea">Fêmea</option>
        </select>
      </div>

      {/* Peso */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          Peso (kg) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={petForm.weight || ""}
          onChange={(e) =>
            setPetForm({ ...petForm, weight: Number(e.target.value) })
          }
          required
          min="0.1"
          step="0.1"
          placeholder="Ex: 15.5"
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition"
        />
      </div>

      {/* Estado */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          Estado <span className="text-red-500">*</span>
        </label>
        <select
          value={petForm.state}
          onChange={(e) =>
            setPetForm({ ...petForm, state: e.target.value, city: "" })
          }
          required
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition bg-white"
        >
          <option value="">Selecione um estado</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.id}>
              {estado.estado}
            </option>
          ))}
        </select>
      </div>

      {/* Cidade */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          Cidade <span className="text-red-500">*</span>
        </label>
        <select
          value={petForm.city}
          onChange={(e) => setPetForm({ ...petForm, city: e.target.value })}
          required
          disabled={!petForm.state || loadingCidades}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">
            {!petForm.state
              ? "Selecione um estado primeiro"
              : loadingCidades
              ? "Carregando cidades..."
              : "Selecione uma cidade"}
          </option>
          {cidades.map((cidade, index) => (
            <option key={`${cidade.id}-${index}`} value={cidade.cidade}>
              {cidade.cidade}
            </option>
          ))}
        </select>
      </div>

      {/* Vacinado */}
      <div className="flex items-center h-full pt-6 sm:pt-8">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={petForm.vaccinated}
              onChange={(e) =>
                setPetForm({ ...petForm, vaccinated: e.target.checked })
              }
              className="w-5 h-5 sm:w-6 sm:h-6 rounded border-2 border-gray-300 text-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 cursor-pointer"
            />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-focinhando-accent transition-colors flex items-center gap-2">
            <FaSyringe className="text-focinhando-accent" />
            Pet vacinado
          </span>
        </label>
      </div>
    </div>
  );
};

export default PetFormFields;
