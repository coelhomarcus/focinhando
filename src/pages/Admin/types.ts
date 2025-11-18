export interface Contact {
   id: string
   fullName: string
   email: string
   phoneNumber: string
   subject: string
   message: string
   createdAt: string
}

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
   userComplementId: string
}

export interface PublicationForm {
   title: string
   topic: string
   img: string
   text: string
}

export type TabType = 'contacts' | 'pets' | 'publications' | 'manage-pets' | 'manage-publications'
