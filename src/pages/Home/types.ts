export interface Pet {
   id: string
   name: string
   img: string
   age: Date
   city: string
   state: string
   sex: string
   vaccinated: boolean
   about: string
   specie: string
   race: string
   weight: number
   userName?: string
   phoneNumber?: string
   email?: string
}

export interface PetModalProps {
   pet: Pet | null
   onClose: () => void
}

export interface PetCardProps {
   pet: Pet
   onClick: (pet: Pet) => void
}

export type FilterType = 'all' | 'Cão' | 'Gato' | 'filhote'

export interface FilterBarProps {
   activeFilter: FilterType
   filteredCount: number
   onFilterChange: (filter: FilterType) => void
   searchQuery: string
   onSearchChange: (query: string) => void
}

export interface PetGridProps {
   pets: Pet[]
   loading: boolean
   activeFilter: FilterType
   onPetClick: (pet: Pet) => void
}
