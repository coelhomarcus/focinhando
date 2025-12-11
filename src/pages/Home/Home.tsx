import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config/api";
import type { Pet, FilterType } from "./types";
import HeroSection from "./components/HeroSection";
import FilterBar from "./components/FilterBar";
import PetGrid from "./components/PetGrid";
import PetModal from "./components/PetModal";

const Home = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadPets = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/pets`);
        const data = await response.json();

        if (data.error) {
          console.error("Erro ao carregar pets:", data.error);
          return;
        }

        const sortedPets = (data.pets || []).sort((a: Pet, b: Pet) =>
          a.name.localeCompare(b.name)
        );
        setPets(sortedPets);
        setFilteredPets(sortedPets);
      } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, []);

  const applyFilters = (filterType: FilterType, search: string) => {
    let filtered: Pet[];

    if (filterType === "all") {
      filtered = pets;
    } else if (filterType === "Cão") {
      filtered = pets.filter((pet) => pet.specie === "cão");
    } else if (filterType === "Gato") {
      filtered = pets.filter((pet) => pet.specie === "gato");
    } else if (filterType === "filhote") {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      filtered = pets.filter((pet) => new Date(pet.age) > oneYearAgo);
    } else {
      filtered = pets;
    }

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchLower) ||
          pet.race.toLowerCase().includes(searchLower)
      );
    }

    setFilteredPets(
      filtered.sort((a: Pet, b: Pet) => a.name.localeCompare(b.name))
    );
  };

  const handleFilter = (filterType: FilterType) => {
    setActiveFilter(filterType);
    applyFilters(filterType, searchQuery);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(activeFilter, query);
  };

  const openModal = (pet: Pet) => {
    setSelectedPet(pet);
  };

  const closeModal = () => {
    setSelectedPet(null);
  };

  return (
    <div className="pb-20">
      <HeroSection />

      <FilterBar
        activeFilter={activeFilter}
        filteredCount={filteredPets.length}
        onFilterChange={handleFilter}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
      />

      <PetGrid
        pets={filteredPets}
        loading={loading}
        activeFilter={activeFilter}
        onPetClick={openModal}
      />

      <PetModal pet={selectedPet} onClose={closeModal} />
    </div>
  );
};

export default Home;
