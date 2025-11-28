import { useState, useEffect, useCallback } from "react";
import {
  FaDog,
  FaCat,
  FaTrash,
  FaMapMarkerAlt,
  FaSyringe,
  FaSpinner,
  FaEdit,
  FaTimes,
} from "react-icons/fa";
import type { Pet, PetsManagementProps } from "../types";

const PetsManagement = ({ apiBaseUrl }: PetsManagementProps) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [saving, setSaving] = useState(false);
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
        return data.secure_url;
      } else {
        alert("Erro ao fazer upload da imagem");
        return null;
      }
    } catch (error) {
      alert("Erro ao fazer upload da imagem " + error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const loadPets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/pets`);
      const data = await response.json();

      if (!data.error && data.pets) {
        setPets(data.pets);
      }
    } catch (error) {
      console.error("Erro ao carregar pets:", error);
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    loadPets();
  }, [loadPets]);

  const handleDelete = async (petId: string) => {
    if (
      !confirm(
        "Tem certeza que deseja remover este pet? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }

    setDeletingId(petId);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${apiBaseUrl}/pets/${petId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!data.error) {
        setPets(pets.filter((pet) => pet.id !== petId));
      } else {
        alert("Erro ao remover pet: " + data.error);
      }
    } catch (error) {
      console.error("Erro ao remover pet:", error);
      alert("Erro ao conectar com o servidor");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (pet: Pet) => {
    setEditingPet({ ...pet });
    setSelectedFile(null);
  };

  const handleSave = async () => {
    if (!editingPet) return;

    setSaving(true);
    let imageUrl = editingPet.img;
    if (selectedFile) {
      imageUrl = (await uploadToCloudinary(selectedFile)) || "";
      if (!imageUrl) {
        setSaving(false);
        return;
      }
    }
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${apiBaseUrl}/pets/${editingPet.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editingPet,
          img: imageUrl,
          weight: Number(editingPet.weight),
        }),
      });

      const data = await response.json();

      if (!data.error) {
        setPets(
          pets.map((pet) =>
            pet.id === editingPet.id ? { ...editingPet, img: imageUrl } : pet
          )
        );
        setEditingPet(null);
        setSelectedFile(null);
      } else {
        alert("Erro ao atualizar pet: " + data.error);
      }
    } catch (error) {
      console.error("Erro ao atualizar pet:", error);
      alert("Erro ao conectar com o servidor");
    } finally {
      setSaving(false);
    }
  };

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const ageInMonths =
      (today.getFullYear() - birth.getFullYear()) * 12 +
      today.getMonth() -
      birth.getMonth();

    if (ageInMonths < 12) {
      return `${ageInMonths} ${ageInMonths === 1 ? "mês" : "meses"}`;
    }
    const years = Math.floor(ageInMonths / 12);
    return `${years} ${years === 1 ? "ano" : "anos"}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <FaSpinner className="animate-spin h-12 w-12 text-focinhando-accent mx-auto mb-4" />
          <p className="text-gray-600">Carregando pets...</p>
        </div>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <FaDog className="text-6xl text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Nenhum pet cadastrado
        </h3>
        <p className="text-gray-600">Os pets cadastrados aparecerão aqui</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pets Cadastrados</h2>
          <p className="text-gray-600 mt-1">
            {pets.length} {pets.length === 1 ? "pet" : "pets"} no sistema
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Pet Image */}
            <div className="relative h-48 bg-gray-100">
              <img
                src={pet.img}
                alt={pet.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/400x300?text=Sem+Imagem";
                }}
              />
              <div className="absolute top-3 right-3">
                {pet.specie === "cão" ? (
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <FaDog /> Cão
                  </div>
                ) : (
                  <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <FaCat /> Gato
                  </div>
                )}
              </div>
            </div>

            {/* Pet Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {pet.name}
                  </h3>
                  <p className="text-sm text-gray-600">{pet.race}</p>
                </div>
                {pet.vaccinated && (
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                    <FaSyringe className="text-xs" /> Vacinado
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaMapMarkerAlt className="text-focinhando-accent" />
                  <span>
                    {pet.city}, {pet.state}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Idade: {calculateAge(pet.age)}</span>
                  <span>•</span>
                  <span>{pet.sex === "macho" ? "♂️ Macho" : "♀️ Fêmea"}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Peso: {pet.weight}kg
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {pet.about}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(pet)}
                  className="flex-1 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                >
                  <FaEdit />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(pet.id)}
                  disabled={deletingId === pet.id}
                  className="flex-1 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deletingId === pet.id ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Removendo...
                    </>
                  ) : (
                    <>
                      <FaTrash />
                      Remover
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingPet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Editar Pet</h2>
              <button
                onClick={() => setEditingPet(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes className="text-xl text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    value={editingPet.name}
                    onChange={(e) =>
                      setEditingPet({ ...editingPet, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:outline-none"
                  />
                </div>

                {/* Raça */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Raça *
                  </label>
                  <input
                    type="text"
                    value={editingPet.race}
                    onChange={(e) =>
                      setEditingPet({ ...editingPet, race: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:outline-none"
                  />
                </div>

                {/* Imagem Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Imagem *
                  </label>
                  <label className="w-full cursor-pointer">
                    <div
                      className={`w-full px-4 py-2.5 rounded-lg border-2 transition flex items-center justify-center gap-2 ${
                        uploading
                          ? "border-focinhando-accent bg-focinhando-accent/5 cursor-wait"
                          : "border-gray-200 bg-gray-50 hover:border-focinhando-accent hover:bg-gray-100"
                      }`}
                    >
                      {uploading ? (
                        <span className="text-focinhando-accent font-semibold">
                          Enviando imagem...
                        </span>
                      ) : (
                        <span className="text-gray-700">
                          {selectedFile
                            ? selectedFile.name
                            : "Escolher arquivo"}
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
                  {(selectedFile || editingPet.img) && (
                    <div className="mt-3 flex items-center gap-3">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 border-focinhando-accent/20">
                        <img
                          src={
                            selectedFile
                              ? URL.createObjectURL(selectedFile)
                              : editingPet.img
                          }
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-gray-600">
                        Preview da imagem
                      </span>
                    </div>
                  )}
                </div>

                {/* Data de Nascimento */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Data de Nascimento *
                  </label>
                  <input
                    type="date"
                    value={editingPet.age}
                    onChange={(e) =>
                      setEditingPet({ ...editingPet, age: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:outline-none"
                  />
                </div>

                {/* Espécie */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Espécie *
                  </label>
                  <select
                    value={editingPet.specie}
                    onChange={(e) =>
                      setEditingPet({ ...editingPet, specie: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:outline-none"
                  >
                    <option value="cão">Cão</option>
                    <option value="gato">Gato</option>
                  </select>
                </div>

                {/* Sexo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sexo *
                  </label>
                  <select
                    value={editingPet.sex}
                    onChange={(e) =>
                      setEditingPet({ ...editingPet, sex: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:outline-none"
                  >
                    <option value="macho">Macho</option>
                    <option value="fêmea">Fêmea</option>
                  </select>
                </div>

                {/* Peso */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Peso (kg) *
                  </label>
                  <input
                    type="number"
                    value={editingPet.weight}
                    onChange={(e) =>
                      setEditingPet({
                        ...editingPet,
                        weight: Number(e.target.value),
                      })
                    }
                    step="0.1"
                    min="0"
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:outline-none"
                  />
                </div>

                {/* Cidade */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={editingPet.city}
                    onChange={(e) =>
                      setEditingPet({ ...editingPet, city: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:outline-none"
                  />
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estado *
                  </label>
                  <input
                    type="text"
                    value={editingPet.state}
                    onChange={(e) =>
                      setEditingPet({
                        ...editingPet,
                        state: e.target.value.toUpperCase(),
                      })
                    }
                    maxLength={2}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:outline-none uppercase"
                  />
                </div>

                {/* Vacinado */}
                <div className="flex items-center pt-8">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingPet.vaccinated}
                      onChange={(e) =>
                        setEditingPet({
                          ...editingPet,
                          vaccinated: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-2 border-gray-300 text-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/20"
                    />
                    <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FaSyringe className="text-focinhando-accent" />
                      Pet vacinado
                    </span>
                  </label>
                </div>
              </div>

              {/* Sobre */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sobre o pet *
                </label>
                <textarea
                  value={editingPet.about}
                  onChange={(e) =>
                    setEditingPet({ ...editingPet, about: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:outline-none resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setEditingPet(null)}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold bg-focinhando-accent text-white hover:bg-focinhando-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar Alterações"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetsManagement;
