export interface PetForm {
   name: string
   img: string
   age: string
   city: string
   state: string
   sex: string
   vaccinated: boolean
   about: string
   specie: string
   race: string
   weight: number
}

export type SubmitStatus = 'idle' | 'success' | 'error'
