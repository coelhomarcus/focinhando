export interface User {
   id: string
   name: string
   email: string
   role: string
   createdAt: Date
   updatedAt: Date
}

export interface UserComplement {
   id: string
   user: {
      name: string
   }
   img: string | null
   phoneNumber: string
   city: string
   state: string
   dateOfBirth: Date | null
   adoptedPet: number
   availablePet: number
   createdAt: Date
}

export interface EditData {
   img: string
   phoneNumber: string
   city: string
   state: string
   dateOfBirth: string
}
