import { useState, useEffect } from 'react'
import { useApi } from '@/hooks/useApi'
import type { Pet, FilterType } from './types'
import HeroSection from './components/HeroSection'
import FilterBar from './components/FilterBar'
import PetGrid from './components/PetGrid'
import PetModal from './components/PetModal'

const Home = () => {
   const { apiBaseUrl } = useApi()
   const [pets, setPets] = useState<Pet[]>([])
   const [filteredPets, setFilteredPets] = useState<Pet[]>([])
   const [loading, setLoading] = useState(true)
   const [activeFilter, setActiveFilter] = useState<FilterType>('all')
   const [selectedPet, setSelectedPet] = useState<Pet | null>(null)

   useEffect(() => {
      const loadPets = async () => {
         setLoading(true)
         try {
            const response = await fetch(`${apiBaseUrl}/pets`)
            const data = await response.json()

            if (data.error) {
               console.error('Erro ao carregar pets:', data.error)
               return
            }

            setPets(data.pets || [])
            setFilteredPets(data.pets || [])
         } catch (error) {
            console.error('Erro ao conectar com o servidor:', error)
         } finally {
            setLoading(false)
         }
      }

      loadPets()
   }, [apiBaseUrl])

   const handleFilter = (filterType: FilterType) => {
      setActiveFilter(filterType)

      if (filterType === 'all') {
         setFilteredPets(pets)
      } else if (filterType === 'Cão') {
         setFilteredPets(pets.filter(pet => pet.specie === 'cão'))
      } else if (filterType === 'Gato') {
         setFilteredPets(pets.filter(pet => pet.specie === 'gato'))
      } else if (filterType === 'filhote') {
         const oneYearAgo = new Date()
         oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
         setFilteredPets(pets.filter(pet => new Date(pet.age) > oneYearAgo))
      }
   }

   const openModal = (pet: Pet) => {
      setSelectedPet(pet)
   }

   const closeModal = () => {
      setSelectedPet(null)
   }

   return (
      <div className='pb-20'>
         <HeroSection />

         <FilterBar
            activeFilter={activeFilter}
            filteredCount={filteredPets.length}
            onFilterChange={handleFilter}
         />

         <PetGrid
            pets={filteredPets}
            loading={loading}
            activeFilter={activeFilter}
            onPetClick={openModal}
         />

         <PetModal pet={selectedPet} onClose={closeModal} />
      </div>
   )
}

export default Home
