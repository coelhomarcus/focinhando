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

export type FilterType = 'all' | 'Cão' | 'Gato' | 'filhote'
